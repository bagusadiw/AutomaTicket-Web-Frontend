import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Img from 'react-image';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	eventCard:{
		backgroundPosition: 'center',	
		width: '100%',
		height: 'auto',
    overflow: 'hidden',
    '& Img':{
      transform: 'scale(3)'
    },
    '&:hover': {
      transition: 'all 0.6s ease-in-out 0s',
      transform: 'scale(1.05)',
      opacity: 0.9,
      '& Img':{

      }
    }
  },

  link:{
  	display:'flex', 
  	justifyContent: 'center',
  	alignContent:'center', 
  	textDecoration: 'none', 
  	color:'black',
  	'& h2':{
			color: '#FFAC00',
			fontSize: '30px',
			margin: '5px 0px',
      position: 'absolute'
  	}
  },

  imageContentCard: {
    width: '100%',
    height: '50px'
  },
}));

export const CategoryList = (props) => {
	const classes = useStyles();
  return (
  	<Grid item xs={12} sm={6} md={3} lg={3} >
  		<Paper elevation={5} className={classes.eventCard}>
  			<Link className={classes.link} to={"category/"+props.id+"/events"}>
          <Img className={classes.imageContentCard} src={props.urlImage} />
	  			<h2>{props.name}</h2>
	  		</Link>
  		</Paper>
  	</Grid>
  );
}
