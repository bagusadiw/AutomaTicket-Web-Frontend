import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper :{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    minHeight: '550px',
    borderRadius: '4px',
    marginTop:'auto'
  },

  bT1:{
    display: 'block',
    width:'80%',
    marginBottom: '30px'
  },

  t1:{
    lineHeight: '32px',
    fontWeight: '900',
    color: '#4267b2',
    margin: '0',
  },

  tFCL:{
   
    display: 'block',
  },

  tFC2:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  tFC3:{
    width: '70%',
    padding: '5px 50px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'flex-start',
    marginBottom: '5px',
  },

  tFLC:{
    marginTop: '5px',
    marginBottom: '5px',
    display: 'block',
  },

  tFL:{
    color: 'black',
    fontSize: '20px',
    lineHeight: '20px',
    fontWeight: 'bold',
    fontFamily: 'Bell MT',
    margin: '0',
  },

  input:{ 
    width:'100%',
    height:'50px', 
    fontSize:'20px',
  },

  bC:{
    margin: '10px 0px',
  },

  submit:{
    fontSize:'30px',
    fontWeight: 800
  }
}));

const AddEvent = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ 
    title: "", 
    idCategory:"",
    startTime: "",
    endTime: "",
    price: 0,
    description: "",
    address: "",
    urlMaps:"",
    img: ""
  });

  const [categories, setCategories] = useState({ categories: [] });

  useEffect(() => {
    axios.get(
      'https://dumbtick-api.herokuapp.com/api/v1/categories'
    )
    .then(res=>{  
      setCategories(res.data)
    },)
    .catch(err => {
      alert(err)
    });
      
  }, [])

  const handleInputChange = (event) =>{
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    axios.post('https://dumbtick-api.herokuapp.com/api/v1/event', {
      title: state.title,
      idCategory: state.idCategory,
      startTime: state.startTime,
      endTime: state.endTime,
      price: state.price,
      description: state.description,
      address: state.address,
      urlMaps: state.urlMaps,
      img: state.img,
      createdBy: localStorage.getItem("id")
    }, {
      headers:{
        authorization: "Bearer "+localStorage.getItem("token")
      }
    })
    .then(res=>{
      alert("Input success");
      window.location.href="/event/"+res.data.events.id
    })
    .catch(err => {
        alert(err)
    });
  };
  
  return (
    <Container container className={classes.paper} maxWidth="md">

      
        <Grid className={classes.tFC2}>
          <Grid className={classes.bT1}>
            <h1 className={classes.t1} component="h1" variant="h4">
              Add Event
            </h1>
          </Grid>
          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>Title Event</Typography>
            </Grid>
            <TextField onChange={handleInputChange} name="title" className={classes.input}></TextField>
          </Grid>

          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>Category</Typography>
            </Grid>

            <TextField
              name="idCategory"
              select
              className={classes.input}
              onChange={handleInputChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">
                --Please select category--    
              </option>
              {Array.isArray(categories) && categories.map((option, index)=> (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>Start Time</Typography>
            </Grid>
            
            <TextField
              type="datetime-local"
              name="startTime"
              onChange={handleInputChange}
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>End Time</Typography>
            </Grid>
            <TextField
              type="datetime-local"
              name="endTime"
              onChange={handleInputChange}
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>Attach Image</Typography>
            </Grid>
            <TextField onChange={handleInputChange} name="img" className={classes.input}></TextField>
          </Grid>

          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>Price</Typography>
            </Grid>
            <TextField onChange={handleInputChange} name="price" className={classes.input}></TextField>
          </Grid>

          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>Address</Typography>
            </Grid>
            <TextField onChange={handleInputChange} name="address" className={classes.input}></TextField>
          </Grid>

          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>URL Maps</Typography>
            </Grid>
            <TextField onChange={handleInputChange} name="urlMaps" className={classes.input}></TextField>
          </Grid>

          <Grid className={classes.tFC3}>
            <Grid className={classes.tFLC}>
              <Typography component="h1" className={classes.tFL}>Description</Typography>
            </Grid>
            <TextField onChange={handleInputChange} name="description" className={classes.input}></TextField>
          </Grid>

          <Grid className={classes.bC}>
            <Button color="primary" size="large" variant="contained" onClick={handleSubmit} className={classes.submit}>
              Publish
            </Button>
          </Grid>
        </Grid>
      
  
    </Container>
  );
}

export default AddEvent;