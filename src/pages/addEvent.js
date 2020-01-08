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
    marginTop:'40px'
  },

  imgContainer:{
    display: 'block',
  },

  img:{
    display: 'block',
    paddingBottom: '16px',
  },

  signUpField :{
    display: 'flex',
    width: '360px',
    height: '100%',
    padding: '44px 56px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
    marginTop: '28px',
    display: 'block',
  },

  textFieldContainer2:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  textFieldContainer3:{
    marginBottom: '28px',
    marginTop: '12px',
    display: 'block',
  },

  textFieldContainer4:{
    width: '70%',
    padding: '5px 50px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'flex-start',
    marginBottom: '5px',
  },

  textFieldLabelContainer:{
    marginTop: '5px',
    marginBottom: '5px',
    display: 'block',
  },

  textFieldLabel:{
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

  buttonContinue:{
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
      'http://localhost:5000/api/v1/categories'
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
    axios.post('http://localhost:5000/api/v1/event', {
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
    <Grid style={{backgroundColor: '#F3EDCE'}}>
      <Container container className={classes.paper} maxWidth="md">
  
        <Grid className={classes.textFieldContainerLogin}>
          <Grid className={classes.textFieldContainer2}>
            <Grid className={classes.boxTypograhpy1}>
              <Typography className={classes.typography1} component="h1" variant="h4">
                Add Event
              </Typography>
            </Grid>
            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>Title Event</Typography>
              </Grid>
              <TextField onChange={handleInputChange} name="title" className={classes.input}></TextField>
            </Grid>

            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>Category</Typography>
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

            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>Start Time</Typography>
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
            
            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>End Time</Typography>
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
            
            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>Attach Image</Typography>
              </Grid>
              <TextField onChange={handleInputChange} name="img" className={classes.input}></TextField>
            </Grid>

            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>Price</Typography>
              </Grid>
              <TextField onChange={handleInputChange} name="price" className={classes.input}></TextField>
            </Grid>

            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>Address</Typography>
              </Grid>
              <TextField onChange={handleInputChange} name="address" className={classes.input}></TextField>
            </Grid>

            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>URL Maps</Typography>
              </Grid>
              <TextField onChange={handleInputChange} name="urlMaps" className={classes.input}></TextField>
            </Grid>

            <Grid className={classes.textFieldContainer4}>
              <Grid className={classes.textFieldLabelContainer}>
                <Typography component="h1" className={classes.textFieldLabel}>Description</Typography>
              </Grid>
              <TextField onChange={handleInputChange} name="description" className={classes.input}></TextField>
            </Grid>

            <Grid className={classes.buttonContinue}>
              <Button color="primary" size="large" variant="contained" onClick={handleSubmit} className={classes.submit}>
                Publish
              </Button>
            </Grid>
          </Grid>
        </Grid>
    
      </Container>
    </Grid>
  );
}

export default AddEvent;