import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Img from 'react-image';
import Container from '@material-ui/core/Container';

import logo from '../img/ticket.png'

const useStyles = makeStyles(theme => ({
	fC1:{
		padding: '60px 0',
		backgroundColor: '#FF5555',
		marginTop:'50px',

	},

	fC2:{
		width: '100%',
		maxWidth: '1192px',
		padding: '0 64px',
		margin: '0 auto',
		display: 'block',
	},

	fC3:{
		paddingTop:'40px',
		paddingBottom: '20px',
		marginBottom: '20px',
		justifyContent: 'space-between',
		display: 'flex',
		borderBottom: '1px solid rgba(255, 255, 255, 0.54)',
		flexDirection:'column'
	},

	fC4:{		
		display: 'flex',
		flexDirection: 'row',
		'& p':{
			color:'white',
		},
	},

	fC6:{
		display:'flex',
		margin: "20px 0",
		flexDirection:'row',
		justifyContent:'center',
		color:'white',
	}
}));

const Footer = () =>{
	const classes = useStyles();
	return(
		<Grid style={{marginTop: 30,backgroundColor:'#4267b2'}}>
			<Container maxWidth='md' style={{display:'flex', flexDirection:'column'}}>	
				<Grid className={classes.fC3}>
					
						<Grid className={classes.fC4} container spacing={2}>
							<Grid item xs={12} md={4}>
								<Grid>
	              	<Img width="75" height="75" src={logo} />
	            	</Grid>
							</Grid>

							<Grid item xs={12} md={4}>
								<Grid style={{display: 'flex', flexDirection:'column', color:'white'}}>
									<Grid style={{fontWeight: 700}}>
										Links
									</Grid>
									<Grid>
										About Us
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} md={4}>
								<Grid style={{display: 'block', paddingBottom: '12px',color:'white'}}>Become a member</Grid>
							</Grid>

							<Grid item xs={12} md={4} >
								
								<Typography>dumb-tick - is a web-based platform that provides tickets for various events aroung sports, music, science, and programming.</Typography>
							</Grid>

							<Grid item xs={12} md={4}>
								<Typography>Follow all the topics you care about, and we’ll deliver the best stories for you to your homepage and inbox. Explore</Typography>
							</Grid>

							<Grid item xs={12} md={4}>
								<Typography>Get unlimited access to the best stories on Medium — and support writers while you’re at it. Just $5/month. Upgrade</Typography>
							</Grid>
						</Grid>
					
				</Grid>

				<Grid className={classes.fC6}>
					<Grid>Copyright 2019 Dumb-Tick</Grid>
				</Grid>
			</Container>

		</Grid>
	);
}

export default Footer;