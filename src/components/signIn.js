import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

const useStyles = (theme => ({
  paper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username:"",
      password: ""
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    axios.post('http://localhost:5000/api/v1/login', {
        username: this.state.username,
        password: this.state.password
    })
    .then(res => {
        const data = res.data;
        localStorage.setItem("id", data.users.id);
        localStorage.setItem("username", data.users.username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLogged", true);
        window.location.reload();
    })
    .catch(err => {
        alert(err)
    });
  }

  render(){
    const classes = this.props.classes;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleInputChange}
                  required
                  fullWidth
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleInputChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              size="large"
              fullWidth
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignUp);