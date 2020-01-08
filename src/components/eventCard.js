import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import Img from 'react-image';
import NumberFormat from 'react-number-format';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  contentCard:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  contentCardPost:{
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 10px 10px 10px',
    '& h2':{
      margin: '0px 0px 0px 0px',
      lineHeight: '30px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width:'200px',
    },
    '& h1, h3':{
      color: '#FF5555',
      fontSize: '17px',
      margin: '0px 0px 0px 0px',
    },
    '& h1': {
      textTransform: 'uppercase',
    },
    '& h4': {
      marginTop: '10px',
    },
    '& p':{
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
      overflow: 'hidden',
    }
  },

  imageContentCard: {
    // flex: '0 1 auto',
    // position: 'relative',
    // width:'305px',
    // maxWidth: '100%',
    // height: '150px',
    // backgroundOrigin: 'border-box!important',
    // backgroundSize: 'cover!important',
    // display: 'block!important',
    width: '100%',
    height: '150px'
  },

  border:{
    borderBottom: '1px solid rgba(0,0,0,.15)',
    maxWidth: '1032px',
    margin: '24px auto',
    display: 'block',
  },

  headerEventCard:{
    display:'flex', flexDirection:'row', 
    justifyContent:'space-between'
  },

  link:{
    textDecoration:'none',
    color: 'black',
  },
  buttonFavorites:{
    '&:hover': {
      transform: 'scale(1.5)'
    }
  },

  eventCard:{
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },

  price:{
    width:'auto', 
    height:'auto', 
    padding:'5px 5px',
    fontSize: '15px',
    fontWeight: 700,
    backgroundColor: '#2699C1',
    color: "white"
  }
}));

export const EventCard = (props) => {
    const [favorited, setFavorited] = useState({ favorited: false });
    const classes = useStyles();

    useEffect(() => {
        axios.post(
          'http://localhost:5000/api/v1/favorites/show', {
          idUser: localStorage.getItem("id"),
          idEvent: props.id
        })
        .then(res=>{  
          setFavorited(res.data.favorited)
        })
        .catch(err => {
          alert(err)
        });
    }, [])

    const handleFavorite = () =>{
      if (favorited){
        axios.post(
          'http://localhost:5000/api/v1/favorites/delete', {
          idUser: localStorage.getItem("id"),
          idEvent: props.id
        }, {
          headers:{
            authorization: "Bearer "+localStorage.getItem("token")
          }
        })
        .then(res=>{  
          setFavorited(res.data.favorited)
        })
        .catch(err => {
          alert(err)
        });
      }else{
        axios.post(
          'http://localhost:5000/api/v1/favorites/store', {
          idUser: localStorage.getItem("id"),
          idEvent: props.id
        }, {
          headers:{
            authorization: "Bearer "+localStorage.getItem("token")
          }
        })
        .then(res=>{  
          setFavorited(res.data.favorited)
        })
        .catch(err => {
          alert(err)
        });
      } 
    };

    var favoritesIcon;
    if(favorited){
      favoritesIcon =
        <Grid>
          <FavoriteIcon onClick={handleFavorite} className={classes.buttonFavorites}/>
        </Grid> 
    }else{
      favoritesIcon =
        <Grid>
          <FavoriteBorderIcon onClick={handleFavorite} className={classes.buttonFavorites}/>
        </Grid>
    }

  return (

    <Grid item xs={12} sm={6} md={4} lg={4} >
      <Paper elevation={5} className={classes.eventCard}>
        <Link style={{textDecoration: 'none', color:'black'}} to={"/event/"+props.id}>
          <CardActionArea className={classes.contentCard}>
            <Img className={classes.imageContentCard} src={props.img} />
            <Grid style={{padding:'10px 10px 0 0', position: 'absolute', alignSelf:'flex-end'}}>
              { props.price ? 
              (
              <Paper className={classes.price}>
                <NumberFormat 
                  value={props.price} 
                  displayType={'text'} 
                  thousandSeparator={true} prefix={'Rp.'} 
                  renderText={value => <Grid>{value}</Grid>} 
                />
              </Paper>
              )
              :
              (
              <Paper className={classes.price}>
                Free
              </Paper>
              )
              }
            </Grid>
          </CardActionArea>
        </Link>
        
        <Grid className={classes.contentCardPost}>
          <Grid container className={classes.headerEventCard}>
            <Link className={classes.link} to={"/event/"+props.id}>
              <Grid>
                <h2>{props.title}</h2>
              </Grid>
            </Link>
            {favoritesIcon}
          </Grid>
          <Link className={classes.link} to={"/event/"+props.id}>
            <h3>{moment(props.start).format("DD MMM YYYY")}</h3>
            <p style={{minHeight: '50px'}}>{props.desc.substring(0, 70)}</p>
          </Link>
        </Grid>
      </Paper>
    </Grid>
  );
}