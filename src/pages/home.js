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
				axios.get(`https://dumbtick-api.herokuapp.com/api/v1/events?title=${this.state.search}`)
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
		let today = new Date();
		let tomorrow1 = new Date();
		tomorrow1.setDate(tomorrow1.getDate() + 1);
		let tomorrow2 = new Date();
		tomorrow2.setDate(tomorrow2.getDate() + 8);

		today = moment(today).format("YYYY-MM-DD")
		tomorrow1 = moment(tomorrow1).format("YYYY-MM-DD")
		tomorrow2 = moment(tomorrow2).format("YYYY-MM-DD")

		this.props.dispatch(getTodayEventsFeed(today, tomorrow1));
		this.props.dispatch(getUpcomingEventsFeed(tomorrow1, tomorrow2));
		this.props.dispatch(getCategoryList());
	}

	render(){
		const classes = this.props.classes;
		const {
			todayEventsFeed, 
			upcomingEventsFeed,
			isLoadingEvents,
			isErrorEvents
		} = this.props.homeRedux;
		const {
			categoryList,
			isLoadingCategories,
			isErrorCategories
		} = this.props.categoryRedux;

	  return (
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
			  			<h2 style={{color: '#4267b2'}}>CATEGORY</h2>
			  		</Grid>
			  		<Grid container spacing={3}>
		      		{categoryList.map((item, index)=>
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
				  			<h2 style={{color: '#4267b2'}}>SEARCH RESULT</h2>
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
					      <Grid style={{marginBottom: '30px'}}>
						  		<Grid>
						  			<h2 style={{color: '#4267b2'}}>TODAY</h2>
						  		</Grid>
						  		<Grid container spacing={3}>
					      		{todayEventsFeed.sort(function(a,b) {return new Date(a.startTime) - new Date(b.startTime)}).map((item, index)=>
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

					      <Grid style={{marginBottom: '30px'}}>
						  		<Grid>
						  			<h2 style={{color: '#4267b2'}}>UPCOMING EVENTS</h2>
						  		</Grid>
						  		<Grid container spacing={3}>
					      		{upcomingEventsFeed.sort(function(a,b) {return new Date(a.startTime) - new Date(b.startTime)}).map((item, index)=>			      			
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
				      )
			    	}
			    	</Grid>
		    	)
		    }
    	</Container>
	  );
  }
}

const mapStatetoProps = state => ({
	homeRedux: state.homeReducer,
	categoryRedux: state.categoryReducer
})

export default connect(mapStatetoProps)(withStyles(useStyles)(Home));
