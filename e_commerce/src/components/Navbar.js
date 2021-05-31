import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography,  Button, IconButton, MenuItem, Menu}  from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { signout } from '../reducer/userAction'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
    transition: 0.5
  },
  title: {
    flexGrow: 1,
    fontSize:30,
    fontFamily:'Helvetica Neue'
  },
  navbar: {
    background:'#64b5f6'
  },
  font: {
      fontSize: '15px'
  },
  screen: {
    padding:'10px',
    margin: theme.spacing(2),
    fontSize:'17px'
  }
}))

function Navbar() {
    const classes = useStyles()

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleClose = () => {
      setAnchorEl(null)
    }

    const signoutHandler = () => {
        dispatch(signout())
    }


    return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="shopify">
            <MenuIcon style={{ fontSize: 35 }}  />
          </IconButton>
          <Typography variant="subtitle" className={classes.title}>
            <Link style={{textDecoration: 'none', color: 'white'}} to="/">Shopify</Link>
          </Typography>
          <Button className={classes.button} color="inherit" style={{margin:10}}>
            <Typography variant="subtitle" className={classes.font}>
            <Link style={{textDecoration: 'none', color: 'white'}}  to="/cart/:id?">Cart
            {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            </Typography>
          </Button>
          {
            userInfo ? 
            <div>
              <Typography variant="subtitle" className={classes.font}>
              <Link style={{textDecoration: 'none', color: 'white'}} to="#">{userInfo.name}</Link>
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <AccountCircle style={{fontSize: 35}} />
              </IconButton>
              <Menu className={classes.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem className={classes.screen} onClick={handleClose} ><Link style={{textDecoration: 'none', color: 'black'}} to="/order/history">Order History</Link></MenuItem>
                <MenuItem className={classes.screen} onClick={handleClose, signoutHandler} >Logout</MenuItem>
              </Menu>
            </div>
            :
            <Button variant="outlined" className={classes.button} color="inherit">
            <Typography variant="subtitle" className={classes.font}>
            <Link style={{textDecoration: 'none', color: 'white'}} to="/signin">Sign In</Link>
            </Typography>
            </Button>
                
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
