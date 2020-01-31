import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import Img from 'react-image';

import axios from 'axios'

const useStyles = makeStyles(theme => ({
	tC:{
  	margin: '30px 30px',
  },

  tIC:{
  	border:'20px solid #4267b2',
  	backgroundColor: 'white',
  	minHeight:'100px'
  },

  tIH:{
  	display:'flex',
  	flexDirection:'row',
  	backgroundColor: 'grey',
  	justifyContent: 'space-between',
  	padding: '5px 15px 5px 30px',
  	textAlign: 'left',
  	'& h2':{
  		margin: '0px 0px',
  		fontWeight: 400
  	},
  	'& h3':{
  		margin:'0px 0px',
  		fontWeight: 400,
  		color: 'lightgrey'
  	},
  	'& p':{
  		margin: '0px 0px'
  	}
  },

  tIF:{
  	display:'flex',
  	flexDirection:'row',
  	backgroundColor: 'white',
  	justifyContent: 'space-between',
  	padding: '5px 15px 5px 30px',
  	textAlign: 'left',
  	'& h1':{
  		margin: '0px 0px 3px 0px',
  	},
  	'& p':{
  		margin: '0px 0px 3px 0px'
  	}
  },

  summary:{
  	display: 'flex',
  	flexDirection: 'row',
  	border: '20px solid transparent',
  	justifyContent:'space-between',
  	padding: '0px 15px 15px 30px',
  	'& h2':{
  		margin: '0px 0px 5px 0px',
  		color: 'grey'
  	},
  	'& p':{
  		margin: '0px 0px'
  	}
  },

  proof:{
  	display: 'flex', 
  	flexDirection:'column', 
  	alignItems:'center'
  },

  submit:{
  	padding: '10px 10px',
    fontSize:'20px',
    fontWeight: 800,
    alignSelf: 'center',
    '&:hover':{
    	transform:'scale(1.1)'
    },
    '& h2':{
    	color: 'white'
    }
  }
}));

const MyTicketFeed = (props) => {
	const classes = useStyles();
  const [statusNow, setStatusNow] = useState({statuNow : "CONFIRM"});
  

   useEffect(() => {
      setStatusNow(props.status)
  }, [props.status])

  const handlePress = () =>{
    const idOrder = props.idOrder;
    if(statusNow === "CONFIRM"){
      axios.put(`https://dumbtick-api.herokuapp.com/api/v1/order/${idOrder}`, {
        status: "PENDING"
      }, {
        headers:{
          Authorization: "Bearer "+localStorage.getItem("token")
        }
      })
      .then(res => {
          alert("Confirm Success")
          setStatusNow("PENDING")
      })
      .catch(err => {
          alert(err)
      });  
    }else if(statusNow === "PENDING"){
      axios.put(`https://dumbtick-api.herokuapp.com/api/v1/order/${idOrder}`, {
        status :  "APPROVED"
      }, {
        headers:{
          Authorization: "Bearer "+localStorage.getItem("token")
        }
      })
      .then(res => {
          setStatusNow("APPROVED")
          window.location.href="/my-ticket"
      })
      .catch(err => {
          alert(err)
      });
    }
  }

	var statusPayment;
  if(statusNow === "PENDING"){
    statusPayment =
      <Paper onClick={handlePress} className={classes.submit} style={{backgroundColor: 'orange'}}>
        <h2>PENDING</h2>
			</Paper>
  }else if(statusNow === "CONFIRM"){
    statusPayment =
      <Paper onClick={handlePress} className={classes.submit} style={{backgroundColor: 'red'}}>
        <h2>CONFIRM</h2>
			</Paper>
  }else {
  	statusPayment =
	  	<Paper className={classes.submit} style={{backgroundColor: 'green'}}>
	      <h2>APPROVED</h2>
			</Paper>
  }

	return(
		<Grid className={classes.tC}>
			<Grid className={classes.tIC}>
				<Grid className={classes.tIH}>
					<Grid>
						<h2>{props.userName}</h2>
						<h3>{props.idUser}</h3>
					</Grid>
					<Grid>
						<p>Facevalue Rp.{props.price}</p>
						<h3>-</h3>
					</Grid>
				</Grid>
				<Grid className={classes.tIF}>
					<Grid>
						<h1>{props.title}</h1>
						<p>{moment(props.startTime).format("dddd")} {moment(props.startTime).format("DD MMM YYYY")} at {moment(props.startTime).utc().format("HH:mm")}</p>
						<p>{props.address}</p>
					</Grid>
					<Grid>
						<Img style={{width: '150px', height:'150px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" />
					</Grid>
				</Grid>
			</Grid>

			<Grid style={{borderBottom: '2px solid grey'}} className={classes.summary}>
				<Grid>
					<h2>Shopping summary</h2>
					<p>Total Price ({props.quantity} Item)</p>
				</Grid>
				<Grid style={{alignSelf: 'flex-end'}}>
					<p>Rp.{props.totalPrice}</p>
				</Grid>
			</Grid>
			<Grid className={classes.summary}>
				<Grid className={classes.proof}>
					<Grid>
						<h2>Prove of Payment</h2>
					</Grid>
					<Grid>
						<Img style={{width: '150px', height:'150px'}} src="http://skripsilive.com/wp-content/uploads/et_temp/IMG-20180502-WA0009-576x1024-47225_576x675.jpg" />
					</Grid>
				</Grid>
				{statusPayment}
			</Grid>	
		</Grid>
	);
}
export default MyTicketFeed;