import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Img from 'react-image';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';

import logo from '../img/ticket.png'
import ModalSign from './modal';
import SignUp from './signUp';
import SignIn from './signIn';
import Dropdown from './dropdown';

const useStyles = (theme => ({
  body:{
    backgroundColor:'#4267b2',
    marginBottom: 30,
  },

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
    backgroundColor:'#4267b2'
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
    alignItems: 'center',
    '& h2':{
      color: 'orange',
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
  },

  headerTitle:{
    display:'flex', 
    flexDirection:'row', 
    alignItems:'center',
    '& h2':{
      color: 'white',
      margin: '5px 0px'
    }
  }
}));

class Header extends Component {  
  
  render(){
    const { classes } = this.props;
    const isLogged = localStorage.getItem("isLogged");
    let menuHeader;
    
    if(isLogged){
      menuHeader = 
        <Grid className={classes.dropdown}>
          <h2 style={{marginRight: 10}}>{localStorage.getItem("username")}</h2>
          <Dropdown />
        </Grid>;
    }else{
      menuHeader = 
        <Grid className={classes.buttonContainer}>
          <Grid className={classes.buttonSign}>
            <ModalSign 
              buttonText="Register"
              Component={<SignUp />}
              title="INI MODAL REGISTER"
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
      <Grid className={classes.body}>
        <Container maxWidth='md' className={classes.container}>
          <Grid className={classes.toolBar}>
            <Link className={classes.link} to="/">
              <Grid>
                <Img width="60" height="60" src={logo} />
              </Grid>
              <Grid className={classes.headerTitle}>
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