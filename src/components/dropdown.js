import React from 'react';
// import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },

  popper:{
    zIndex: 850,
    left: 1,
  },

  menuItem:{
  	display: 'block',
    
    '& p':{
      fontSize: '25px',
      fontWeight: 100,
      margin:'auto 0'
    }
  },

  menuItemBorder:{
  	borderTop: '1px solid rgba(0,0,0,.15)',
  },

  menuDropdown:{
  	display: 'flex',
  	flexDirection: 'row'
  },

  menuList:{
    padding: '0 0',
    '& p':{
      fontSize: 15
    }
  },

  link:{
    textDecoration: 'none', 
    color:'black',
  }

  // dropdownInfo:{
  // 	display:'flex',
  // 	flexDirection:'column',
  // 	marginLeft: 10,
  // 	'& p':{
  // 		margin: '0 0',
  // 		fontSize: 14,
  // 	}
  // },
}));

const Dropdown = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload()
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  return (
    <div className={classes.root}>

      <div>
        <Avatar
          style={{width: '50px', height:'50px'}}
        	ref={anchorRef} 
        	aria-controls={open ? 'menu-list-grow' : undefined} 
        	onClick={handleToggle} 
        	src="https://miro.medium.com/fit/c/32/32/0*QyRZTOjP8Df9TTUu" 
        />
        <Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{  marginTop:'10px',transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper elevation={5} className={classes.menuItem}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" class={classes.menuList} onKeyDown={handleListKeyDown}>
                    <Link className={classes.link} to="/profile">
                      <MenuItem  onClick={handleClose}>
                        <p>
  	                    	Profile
                        </p>
                      </MenuItem>
                    </Link>
                    <Link className={classes.link} to="/my-ticket">
                      <MenuItem onClick={handleClose}>
                      	<p>
                          My Ticket
                        </p>
                      </MenuItem>
                    </Link>
                    <Link className={classes.link} to="/payment">
                      <MenuItem onClick={handleClose}>
                      	<p>
                          Payment
                        </p>
                      </MenuItem>
                    </Link>
                    <Link className={classes.link} to="/add-event">
	                    <MenuItem onClick={handleClose}>
	                    	<p>
                          Add Event
                        </p>
	                    </MenuItem>
                    </Link>
                    <MenuItem className={classes.menuItemBorder} onClick={handleLogout}>
                      <p>
                        Log Out
                      </p>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default Dropdown;