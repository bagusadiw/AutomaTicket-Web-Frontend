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
    margin: '50px 0 50px 0',
  },

  searchLabel:{
  	fontSize: '30px',
  	fontWeight: 800  	
  },

  searchInput:{
   	zIndex: 800,
  	fontSize: '30px',
  }
}))

export const Search = ({ 
type, 
placeHolder, 
name, 
handleChange, 
handleSearch,
handleClear, 
searchMode }) => {
	const classes = useStyles();
	return(
		<Grid className={classes.margin}>
		<InputLabel 
      htmlFor="standard-adornment-amount" 
      className={classes.searchLabel}
    >
      {placeHolder}
    </InputLabel>

		<FormControl fullWidth>
      <Input
      	className={classes.searchInput}
        type={type}
      	name={name}
        id="standard-adornment-amount"
        onChange={handleChange}
        onKeyPress={handleSearch}
        startAdornment={
          <InputAdornment position="start">
            <Icon variant="contained" color="primary">
              <SearchIcon />
            </Icon>
          </InputAdornment>
        }
        endAdornment={
          searchMode && 
          (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} color="secondary">
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