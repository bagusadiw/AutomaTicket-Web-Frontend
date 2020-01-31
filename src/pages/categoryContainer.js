import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import moment from 'moment'

import { connect } from 'react-redux';
import { getEventsByCategory } from "../redux/category/category.action";

import {Search} from '../components/search';
import {EventCard} from '../components/eventCard';

const useStyles = (theme=>({
	eventCard:{
		'&:hover': {
      transform: 'scale(1.05)'
    }
	}
}));

class CategoryContainer extends Component {
	constructor(){
		super();
		this.state={
			events:[],
			search: ''
		}
	}

	handleChange = event =>{
		this.setState({ [event.target.name]: event.target.value });
	}

  componentDidMount(){
    const idCategory = this.props.match.params.id;
    this.props.dispatch(getEventsByCategory(idCategory));
  //   axios.get(`https://dumbtick-api.herokuapp.com/api/v1/category/${idCategory}/events`)
		// .then(res => {
		// 	this.setState({
		// 		events: res.data
		// 	})
		// })
		// .catch(err => 
		// 	alert(err)
		// );
  }

  render(){
    const events = this.props.events;
    const classes = this.props.classes;
    const search = this.state.search;

    const filteredEvents = events.filter(item =>{
    	const date = moment(item.startTime).format("YYYY-MM-DD");
      return (date.includes(search))
		});

    return (
  		<Container maxWidth='md' style={{display:'flex', flexDirection:'column'}}>
  			<Search 
      		placeHolder="Search by Date"
      		name="search"
      		handleChange={this.handleChange}
      		type="date"
      	/>
      	<Grid>
		      <Grid className={classes.eventContainer1}>
			      <Grid className={classes.eventContainer2}>
				  		<Grid>
				  			<h1 style={{color: 'orange'}}>EVENTS BY CATEGORY</h1>
				  		</Grid>
				  		<Grid container className={classes.eventContainer3} spacing={2}>
			      		{filteredEvents.sort(function(a,b) {return new Date(a.startTime) - new Date(b.startTime)}).map((item, index)=>
			      			<EventCard
			      				key={index}
			      				id={item.id}
			      				title={item.title}
			      				start={item.startTime}
			      				img={item.img}
			      				price={item.price}
			      				desc={item.description}
			      			/>
			      		)}
			      	</Grid>
			      </Grid>
			    </Grid>
		    </Grid>
      </Container>
    );
  }
}

const mapStatetoProps = state => ({
	events: state.categoryReducer.eventsByCategory
})

export default connect(mapStatetoProps)(withStyles(useStyles)(CategoryContainer));