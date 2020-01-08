import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton'; 
import moment from 'moment';

import axios from 'axios';
import { connect } from 'react-redux';
import { 
	getEventsFeed, 
	getTodayEventsFeed,
	getUpcomingEventsFeed } from "../redux/home/home.action";
import { getCategoryList } from "../redux/category/category.action";

import {Search} from '../components/search';
import {EventCard} from '../components/eventCard';
import {CategoryList} from '../components/categoryList';

const useStyles = (theme=>({
	categories:{
		display:'flex',
		flexDirection:'column',
		alignItems:'center',
	},

	category:{
		display:'flex', 
		flexDirection:'row',
		justifyContent:'center'
	},

  loadingChild:{
  	width: '100%',
  	marginTop: '40px',
  	display: 'flex', 
  	flexDirection:'column',
  	marginBottom: '30px'
  }
}))

class Home extends Component {
	constructor(){
		super();
		this.state={
			search: '',
			searchResult: [],
			notFound: false,
			searchMode: false
		}
	}

	handleChange = event =>{  
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSearch = (event) =>{
		if(event.key === 'Enter'){ 
			if (this.state.search !== ''){
				this.setState({
					searchMode: true
				});
				axios.get(`http://localhost:5000/api/v1/events?title=${this.state.search}`)
				.then(res => {
					this.setState({
						searchResult: res.data.events,
						notFound: res.data.notFound
					})
				});
			}else{
				alert("Search field must be filled!!!")
			}
		}

		if(event.keyCode === 27){
			this.setState({
				search: '',
				searchMode: false,
				notFound: false,
				searchResult: []
			})	
		}
	}

	handleClear = () =>{
		this.setState({
			search: '',
			searchMode: false,
			notFound: false,
			searchResult: []
		})
	}

	componentDidMount(){
		var today = new Date();
		var tomorrow1 = new Date();
		tomorrow1.setDate(tomorrow1.getDate() + 1);
		var tomorrow2 = new Date();
		tomorrow2.setDate(tomorrow2.getDate() + 8);

		var today = moment(today).format("YYYY-MM-DD")
		var tomorrow1 = moment(tomorrow1).format("YYYY-MM-DD")
		var tomorrow2 = moment(tomorrow2).format("YYYY-MM-DD")

		this.props.dispatch(getTodayEventsFeed(today, tomorrow1));
		this.props.dispatch(getUpcomingEventsFeed(tomorrow1, tomorrow2));
		this.props.dispatch(getCategoryList());
	}

	render(){
		const classes = this.props.classes
		const isLoadingEvents = this.props.isLoadingEvents
		const isErrorEvents = this.props.isErrorEvents
		const isLoadingCategories = this.props.isLoadingCategories
		const isErrorCategories = this.props.isErrorCategories

		// // TODAY EVENTS FEED 
		// const todayEvents = this.props.eventsFeed.filter(item => {
		//   const date = new Date(item.startTime);
		//   const today = new Date();
		//   return (moment(date).format("DD MM YYYY") === moment(today).format("DD MM YYYY"));
		// });

		//  // UPCOMING EVENTS FEED 
		// const upcomingEvents = this.props.eventsFeed.filter(item => {
		//   const date = new Date(item.startTime);
		//   var tomorrow = new Date();
		// 	tomorrow.setDate(tomorrow.getDate() + 1);
			
		//   return (date.toString().substring(0,10) === tomorrow.toString().substring(0,10));
		// });

	  return (
	    <Grid style={{backgroundColor: '#F3EDCE', paddingBottom:'48px'}}>
	      <Container maxWidth='md' style={{display:'flex', flexDirection:'column'}}>
	      	{ isLoadingCategories ?
			    	(
              <Grid className={classes.loadingChild}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
              </Grid>
            )
            :
            isErrorCategories ?
            (
            <Grid style={{justifyContent:'center', display:'flex'}}>
            	<Grid>
            		<h3>Fetching Category List Failed</h3>
            	</Grid>
            </Grid>
            )
            :
            (
				    <Grid>
				  		<Grid>
				  			<h1 style={{color: '#FF5555'}}>CATEGORY</h1>
				  		</Grid>
				  		<Grid container spacing={3}>
			      		{this.props.categoryList.map((item, index)=>
			      			<CategoryList
			      				key={index} 
			      				id={item.id}
			      				name={item.name}
			      				urlImage={item.urlImage}
			      			/>
			      		)}
			      	</Grid>
				    </Grid>
				    )
				  }
	      	{/* SEARCH */}
	      	<Search 
	      		placeHolder="Search Event"
	      		name="search"
	      		value={this.state.search}
	      		handleChange={this.handleChange}
	      		handleSearch={this.handleSearch}
	      		handleClear={this.handleClear}
	      		searchMode={this.state.searchMode}
	      	/>
	      	
	      	{this.state.searchMode ?
			      ( 
				      <Grid>
				      	<Grid>
					  			<h1 style={{color: 'blue'}}>SEARCH RESULT</h1>
					  		</Grid>
					  		{this.state.notFound ?
					  			(
						  		<Grid style={{display:'flex', justifyContent:'center'}}>
				      			<h2>Data not found</h2>
				      		</Grid>
				      		)
				      		:
				      		(
				      		<Grid container spacing={3}>
					      		{this.state.searchResult.sort(function(a,b) {return new Date(a.startTime) - new Date(b.startTime)}).map((item, index)=>			      			
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
				      		)
				      	}
				      </Grid>
			      )
			      :
			      ( 
			      	<Grid>
					    { isLoadingEvents ?
					    	(
		            <Grid className={classes.loadingChild}>
		              <Grid>
		                <Skeleton variant="text" />
		                <Skeleton variant="circle" width={40} height={40} />
		                <Skeleton variant="rect" width="100%" height={118} />
		              </Grid>
		              <Grid>
		                <Skeleton variant="text" />
		                <Skeleton variant="circle" width={40} height={40} />
		                <Skeleton variant="rect" width="100%" height={118} />
		              </Grid>
		            </Grid>
					    	)
					    	:
					    	isErrorEvents ?
					    	(
								<Grid style={{justifyContent:'center', display:'flex'}}>			    		
					    		<Grid>
					    			<h3>Fetching Events Failed</h3>
					    		</Grid>
					    	</Grid>
					      )
					      :
					      (
					      <Grid>
						      <Grid style={{marginBottom: '60px'}}>
							  		<Grid>
							  			<h1 style={{color: '#FF5555'}}>TODAY</h1>
							  		</Grid>
							  		<Grid container spacing={3}>
						      		{this.props.todayEvents.sort(function(a,b) {return new Date(a.startTime) - new Date(b.startTime)}).map((item, index)=>
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

						  		<Grid>
						  			<h1 style={{color: 'green'}}>UPCOMING EVENTS</h1>
						  		</Grid>
						  		<Grid container spacing={3}>
					      		{this.props.upcomingEvents.sort(function(a,b) {return new Date(a.startTime) - new Date(b.startTime)}).map((item, index)=>			      			
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
					      )
				    	}
				    	</Grid>
			    	)
			    }
	    	</Container>
	    </Grid>
	  );
  }
}

const mapStatetoProps = state => ({
	todayEvents: state.homeReducer.todayEventsFeed,
	upcomingEvents: state.homeReducer.upcomingEventsFeed,
	categoryList: state.categoryReducer.categoryList,
	isLoadingEvents: state.homeReducer.isLoadingEvents,
	isErrorEvents : state.homeReducer.isErrorEvents,
	isLoadingCategories: state.categoryReducer.isLoadingCategories,
	isErrorCategories: state.categoryReducer.isErrorCategories
})

export default connect(mapStatetoProps)(withStyles(useStyles)(Home));
