import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Img from 'react-image';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';

const useStyles = (theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},

	childContainer: {
		width: '100%'
	},

	paper: {
		padding: '15px 15px',
		border: '5px solid lightgrey',
		'& p': {
			textAlign: 'justify'
		}
	},

	imgContainer: {
		width: '100%',
	},

	categoryButtonBuy: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		width: '100%',
		'& h2': {
			color: '#4267b2',
			margin: '0px 0px'
		}
	},

	titlePrice: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottom: '2px solid lightgrey',
		paddingBottom: '10px',
		'& h1': {
			margin: '0px 0px'
		},
		'& h2': {
			color: '#4267b2'
		}
	},

	buttonBuy: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},

	imgContent: {
		width: '100%'
	},

	map: {
		width: "100%",
		height: "450px",
		frameBorder: "0",
		border: '0',
		allowFullscreen: true
	}
}));

class Home extends Component {
	constructor() {
		super();
		this.state = {
			eventDetail: [],
			counter: 1,
			totalPrice: 0
		}
	}

	componentDidMount() {
		const idEvent = this.props.match.params.id;
		axios.get(`https://dumbtick-api.herokuapp.com/api/v1/event/${idEvent}`)
			.then(res => {
				this.setState({
					eventDetail: res.data
				})
			});
	}

	handleAdd = () => {
		this.setState({
			counter: this.state.counter + 1
		},
			() => {
				this.setState({
					totalPrice: this.state.eventDetail.price * this.state.counter
				})
			})
	};

	handleMinus = () => {
		if ((this.state.counter - 1) < 1) {
			this.setState({ counter: 1 })
		} else {
			this.setState({
				counter: this.state.counter - 1
			}, () => {
				this.setState({
					totalPrice: this.state.eventDetail.price * this.state.counter
				})
			});
		}
	};

	handleBuy = () => {
		axios.post('https://dumbtick-api.herokuapp.com/api/v1/order', {
			idEvent: this.state.eventDetail.id,
			idUser: localStorage.getItem("id"),
			quantity: this.state.counter,
			totalPrice: this.state.totalPrice,
			status: 'CONFIRM'
		}, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
		})
			.then(res => {
				alert("Buy ticket success")
				window.location = "/payment"
			})
			.catch(err => {
				alert(err)
			});
	}

	render() {
		const classes = this.props.classes;
		const eventDetail = this.state.eventDetail;
		const eventCategory = this.state.eventDetail.eventCategory;
		const eventUser = this.state.eventDetail.eventCreator;

		return (
			<Container maxWidth='md' className={classes.container}>
				<Grid container spacing={2} >
					{/*CHILD CONTAINER 1 */}
					<Grid item className={classes.childContainer}>
						<Paper item elevation={5} className={classes.paper}>

							{/* INFO DETAIL 1 */}
							<Grid>
								<Grid className={classes.imgContainer}>
									<Img className={classes.imgContent} src={eventDetail.img} />
								</Grid>
								<Grid className={classes.titlePrice}>
									<Grid><h1>{eventDetail.title}</h1></Grid>
									<Grid>
										<NumberFormat
											value={eventDetail.price}
											displayType={'text'}
											thousandSeparator={true} prefix={'Rp.'}
											renderText={value => <h2>{value}</h2>}
										/>
									</Grid>
								</Grid>

								<Grid className={classes.categoryButtonBuy}>
									<h2>
										{eventCategory && eventCategory.name}
									</h2>
									{localStorage.getItem("token") ?
										(
											<Grid className={classes.buttonBuy}>
												<IconButton
													onClick={this.handleMinus}
													color="secondary"
													component="span"
												>
													<RemoveIcon />
												</IconButton>
												<h1 style={{ margin: '0px 10px 0 10px' }}>
													{this.state.counter}
												</h1>
												<Grid>
													<IconButton
														onClick={this.handleAdd}
														color="secondary"
														component="span"
													>
														<AddIcon />
													</IconButton>
												</Grid>
												<Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px' }}>
													<Button
														onClick={this.handleBuy}
														size="large"
														variant="contained"
														color="primary"
													>
														Buy
					            </Button>
												</Grid>
											</Grid>
										)
										:
										(
											<div></div>
										)
									}
								</Grid>
							</Grid>

							{/* INFO DETAIL 2 */}
							<Grid container>
								<Grid item sm={4}></Grid>
								<Grid item sm={4}></Grid>
								<Grid item sm={4} style={{ display: 'flex', flexDirection: 'column' }}>
									<Grid>{eventUser && eventUser.name}</Grid>
									<Grid>{eventUser && eventUser.phone}</Grid>
									<Grid>{eventUser && eventUser.email}</Grid>
								</Grid>
							</Grid>

						</Paper>
					</Grid>

					{/* CHILD CONTAINER 2 */}
					<Grid item className={classes.childContainer}>
						<Paper item elevation={5} className={classes.paper}>
							<Grid container spacing={2}>
								<Grid style={{ borderRight: '2px solid lightgrey' }} item sm={6}>
									<p>{eventDetail.description}</p>
								</Grid>
								<Grid item sm={6}>
									<p>{eventDetail.address}</p>
									<iframe
										className={classes.map}
										src={eventDetail.urlMaps}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Home);
