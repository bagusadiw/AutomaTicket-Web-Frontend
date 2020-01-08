import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	eventCard:{
		backgroundPosition: 'center',	
		opacity: '1',
		width: '100%',
		height: 'auto',
    '&:hover': {
			backgroundColor: 'orange',
    	opacity: '0.5',
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
			margin: '5px 0px'
  	}
  }
}));

export const CategoryList = (props) => {
	const classes = useStyles();
  return (
  	<Grid item xs={12} sm={6} md={6} lg={3} >
  		<Paper elevation={5} className={classes.eventCard} style={{backgroundImage: `url(${props.urlImage})`}}>
  			<Link className={classes.link} to={"category/"+props.id+"/events"}>
	  			<h2>{props.name}</h2>
	  		</Link>
  		</Paper>
  	</Grid>
  );
}
