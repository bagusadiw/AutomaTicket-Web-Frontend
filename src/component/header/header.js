import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Img from 'react-image';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';

import logo from '../../img/ticket.png'
import ModalSign from '../modal/modal';
import SignUp from '../sign/signUp';
import SignIn from '../sign/signIn';
import Dropdown from '../dropdown/dropdown';

const useStyles = (theme => ({
  container: {
    display:'flex', 
    flexDirection:'column'
  },

  toolBar:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between!important',
    alignItems: 'center',
    width: '100%',
    margin: '0px auto 0px auto',
    backgroundColor:'#07d9c4'
  },

  buttonContainer:{
    display: 'flex', 
    flexDirection:'row',
  },

  buttonSign:{
    marginRight:'20px'
  },

  dropdown:{
    display: 'flex',
    flexDirection: 'row',
    '& h1':{
      color: 'yellow',
      margin: '0 0',
    }
  },

  link:{
    display:'flex', 
    justifyContent: 'center',
    alignContent:'center', 
    flexDirection: 'row',
    textDecoration: 'none', 
    color:'black',
    '& h2':{
      color: 'white',
      fontSize: '30px',
      margin: '5px 0px'
    }
  }
}));

class Header extends Component {  
  
  render(){
    const { classes } = this.props;
    const isLogged = localStorage.getItem("isLogged");
    var menuHeader;
    
    if(isLogged){
      menuHeader = 
        <Grid container spacing={1} className={classes.dropdown}>
          <Grid item style={{alignSelf:'center'}}>
            <h1>{localStorage.getItem("username")}</h1>
          </Grid>
          <Grid item>
            <Dropdown />
          </Grid>
        </Grid>;
    }else{
      menuHeader = 
        <Grid className={classes.buttonContainer}>
          <Grid className={classes.buttonSign}>
            <ModalSign 
              buttonText="Register"
              Component={<SignUp />}
            />
          </Grid>
          <Grid>
            <ModalSign 
              buttonText="Login"
              Component={<SignIn />}
            />
          </Grid>
        </Grid>;
    }
    return (
      <Grid style={{backgroundColor:'#07d9c4'}}>
        <Container maxWidth='md' className={classes.container}>
          <Grid className={classes.toolBar}>
            <Link className={classes.link} to="/">
              <Grid>
                <Img width="80" height="80" src={logo} />
              </Grid>
              <Grid style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <h2>AutomaTicket</h2>
              </Grid>
            </Link>
            <Grid >
              {menuHeader}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Header);