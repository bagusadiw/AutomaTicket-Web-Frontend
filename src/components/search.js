import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
	margin: {
    margin: '25px 0',
  },

  searchLabel:{
  	fontSize: '25px',
  	fontWeight: 800  	
  },

  searchInput:{
   	zIndex: 800,
  	fontSize: '25px',
  }
}))

export const Search = (props) => {
	const classes = useStyles();
	return(
		<Grid className={classes.margin}>
		<FormControl fullWidth>
      <InputLabel 
        htmlFor="standard-adornment-amount" 
        className={classes.searchLabel}
      >
        {props.placeHolder}
      </InputLabel>
      <Input
      	className={classes.searchInput}
        type={props.type}
      	name={props.name}
        id="standard-adornment-amount"
        onChange={props.handleChange}
        onKeyPress={props.handleSearch}
        value={props.value}
        startAdornment={
          <InputAdornment position="start">
            <Icon variant="contained" color="primary">
              <SearchIcon />
            </Icon>
          </InputAdornment>
        }
        endAdornment={
          props.searchMode && 
          (
          <InputAdornment position="end">
            <IconButton onClick={props.handleClear} color="secondary">
              <CancelIcon />
            </IconButton>
          </InputAdornment>
          )
        }
      />
    </FormControl>
   	</Grid>
  );
}