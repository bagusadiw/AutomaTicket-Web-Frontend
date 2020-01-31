import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import axios from 'axios';

import PaymentFeed from '../components/paymentFeed'

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

  bT1:{
    display: 'block',
    width:'100%',
    marginBottom: '30px'
  },

  t1:{
    lineHeight: '32px',
    fontWeight: '900',
    color: '#4267b2',
    margin: '0',
  },

  tFCL:{
    marginTop: '18px',
    display: 'block',
  },

  tFC1:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  tFC2:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  tFC3:{
    textAlign:'center',
    backgroundColor: '#4267b2',
    padding: '10px 0px',
    '& h2':{
      margin: '0px 0px',
      color: 'white'
    }
  },

  tFC4:{
  	width: '100%',
  	minHeight: '150px',
    borderTop: '10px solid #4267b2',
    backgroundColor: 'white',
    alignContent:'center'
  },

  

  
}));

const PaymentContainer = (props) => {
  const classes = useStyles();

  const [orders, setOrders] = useState({ orders: [] });

  useEffect(() => {
  	const idUser = localStorage.getItem('id');
    axios.get(`https://dumbtick-api.herokuapp.com/api/v1/user/${idUser}/orders`, 
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
    <Container container className={classes.paper} maxWidth="md">

      <Grid className={classes.tFCL}>
        <Grid className={classes.tFC1}>
          <Grid className={classes.bT1}>
            <h1 className={classes.t1}>
              Payment
            </h1>
          </Grid>
					
					<Grid container className={classes.tFC2}>
						<Grid item md={6} className={classes.tFC3}>
							<h2>Payment</h2>
						</Grid>
					</Grid>

					<Grid className={classes.tFC4}>							
					{Array.isArray(orders) && orders.map((item, index)=>
						<PaymentFeed 
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
  );
}

export default PaymentContainer;