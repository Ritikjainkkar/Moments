import React, { useState, useEffect } from 'react'
import {AppBar, Avatar, Toolbar, Typography, Button} from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import memories from '../../images/memories.png'
import decode from 'jwt-decode'

export default function Navbar() {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const locaction = useLocation();

  const logOut = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/auth')
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [locaction])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button className={classes.logout} color="secondary" variant="contained" onClick={logOut}>Logout</Button>
          </div>
        ) : (
          <div>
            <Button color="primary" component={Link} to="/auth" variant="contained">Sign In</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}
