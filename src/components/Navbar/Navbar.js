import React, { useState } from 'react'
import {AppBar, Avatar, Toolbar, Typography, Button} from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import memories from '../../images/memories.png'
export default function Navbar() {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


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
            <Typography className={classes.userName} variant="h6">{user.result.name.charAt(0)}</Typography>
            <Button className={classes.logout} color="secondary" variant="contained">Logout</Button>
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
