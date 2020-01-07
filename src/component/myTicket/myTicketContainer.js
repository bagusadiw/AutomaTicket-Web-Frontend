import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import axios from 'axios';

import Header from '../header/header'
import MyTicketFeed from './myTicketFeed'
import Footer from '../footer/footer'

const useStyles = makeStyles(theme => ({
  paper :{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '550px',
    borderRadius: '4px',
    marginTop:'40px'
  },

  imgContainer:{
    display: 'block',
  },

  img:{
    display: 'block',
    paddingBottom: '16px',
  },

  boxTypograhpy1:{
    display: 'block',
    width:'100%',
    marginBottom: '30px'
  },

  typography1:{
    lineHeight: '32px',
    fontSize:'50px',
    fontWeight: '900',
    color: '#FF5555',
    margin: '0',
  },

  boxTypography2:{
    marginTop: '8px',
    display: 'block',
    maxWidth: '360px',
  },

  typography2:{
    color: 'grey',
    fontSize: '12pt',
    lineHeight: '20px',
    fontWeight: '300',
    margin: '0',
    fontFamily: 'Bell MT',
  },

  boxTypography3:{
    marginBottom: '28px',
    marginTop: '28px',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },

  typography3:{
    color: 'black',
    fonthSize: '14pt',
    lineeight: '24px',
    fontWeight: 'bold',
    fontFamily: 'Bell MT',
    margin: '0',
  },

  textFieldContainerLogin:{
    marginTop: '18px',
    display: 'block',
  },

  textFieldContainer2:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  textFieldContainer3:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  textFieldContainer4:{
  	width: '100%',
  	minHeight: '150px',
    borderTop: '10px solid red',
    backgroundColor: 'white',
    alignContent:'center'
  },

  textFieldContainer5:{
  	textAlign:'center',
  	backgroundColor: '#FF5555',
  	padding: '10px 0px',
  	'& p':{
  		fontSize:'35px',
  		margin: '0px 0px',
  		color: 'white'
  	}
  },

  
}));

const MyTickerContainer = (props) => {
  const classes = useStyles();

  const [orders, setOrders] = useState({ orders: [] });

  useEffect(() => {
  	const idUser = localStorage.getItem('id');
    axios.get(`http://localhost:5000/api/v1/order/${idUser}/approved`, 
    {
    	headers:{
        authorization: "Bearer "+localStorage.getItem("token")
      }
    })
    .then(res=>{  
      setOrders(res.data)
    },)
    .catch(err => {
      alert(err)
    });
      
  }, [])
      
  return (
    <Grid style={{backgroundColor: '#F3EDCE'}}>
      <Header />
      <Container container className={classes.paper} maxWidth="md">
      
        <Grid className={classes.textFieldContainerLogin}>
          <Grid className={classes.textFieldContainer2}>
            <Grid className={classes.boxTypograhpy1}>
              <Typography className={classes.typography1} component="h1" variant="h4">
                My Ticket
              </Typography>
            </Grid>

						<Grid className={classes.textFieldContainer4}>							
						{Array.isArray(orders) && orders.map((item, index)=>
							<MyTicketFeed 
								key={index}
								idOrder={item.id}
								userName={item.orderedByUser.name}
								idUser={item.orderedByUser.id}
								price={item.orderedEvent.price}
								title={item.orderedEvent.title}
								startTime={item.orderedEvent.startTime}
								address={item.orderedEvent.address}
								quantity={item.quantity}
								totalPrice={item.totalPrice}
								status={item.status}
							/>
							)
						}	
						</Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Grid>
  );
}

export default MyTickerContainer;