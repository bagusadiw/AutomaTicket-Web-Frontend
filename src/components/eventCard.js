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
  eventCard:{
    display: 'inline-block',
    '&:hover': {
      '& Img':{
        transition: 'all 10s ease-in-out 0s',
        transform: 'scale(1.1)',
        opacity: 0.7,
      }
    }
  },

  contentCard:{
    overflow: 'hidden',
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
    const [favorited, setFavorited] = useState({ favorited: true });
    const classes = useStyles();

    useEffect(() => {
        axios.post(
          'https://dumbtick-api.herokuapp.com/api/v1/favorites/show', {
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
          'https://dumbtick-api.herokuapp.com/api/v1/favorites/delete', {
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
          'https://dumbtick-api.herokuapp.com/api/v1/favorites/store', {
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
          <FavoriteIcon color="primary" onClick={handleFavorite} className={classes.buttonFavorites}/>
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
              <Grid className={classes.price}>
                <NumberFormat 
                  value={props.price} 
                  displayType={'text'} 
                  thousandSeparator={true} prefix={'Rp.'} 
                  renderText={value => <Grid>{value}</Grid>} 
                />
              </Grid>
              )
              :
              (
              <Grid className={classes.price}>
                Free
              </Grid>
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