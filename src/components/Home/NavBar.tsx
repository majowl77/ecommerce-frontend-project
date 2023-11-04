import React, { useEffect, useState } from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { usersSliceActions } from '../../redux/slices/user/userSlice'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    vertical: 'top',
    horizontal: 'right',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))
export default function NavBar() {
  const isLogedIn = useSelector((state: RootState) => state.usersR.isLogedIn)
  const userRole = useSelector((state: RootState) => state.usersR.userRole)
  const isLogedOut = useSelector((state: RootState) => state.usersR.isLogedOut)
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartProducts)
  const dispatch = useDispatch<AppDispatch>()
  const isNavBarInHomePage = useSelector((state: RootState) => state.navBarR.isNavBarInHome)
  const [scrollBackground, setScrollBackground] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrollBackground(window.scrollY > 700)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  const cartCounter = cartItems.reduce((totalItems, oneItem) => {
    return (totalItems += oneItem.quantity)
  }, 0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <header>
      <nav
        className={isNavBarInHomePage ? 'navBarElements' : 'navBarNewBackground'}
        id={scrollBackground ? 'scrollBackground' : ' '}>
        <h3 id="navbarLogo"> GreenPlant</h3>
        <ul className="listNavBar">
          <li className="elementNavBar">
            <Link to="/"> Home</Link>
          </li>
          <li className="elementNavBar">
            <Link to="/products"> Products</Link>
          </li>
          {userRole === 'admin' && (
            <li className="elementNavBar">
              <Link to="/admin"> Admin</Link>
            </li>
          )}
          {!isLogedIn && (
            <li className="elementNavBar" id={isLogedIn ? '' : 'loginItem'}>
              <Link to="/login"> Login</Link>
            </li>
          )}
          {isLogedIn && (
            <li className="elementNavBar" id="logoutItem">
              <button onClick={() => dispatch(usersSliceActions.isLogedOut())}>Logout</button>
            </li>
          )}
          <li className="elementNavBar" id="cartItem">
            <Link to="/cart">
              <IconButton aria-label="cart" color="inherit">
                <StyledBadge badgeContent={cartCounter} color="error">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </li>
          {isLogedIn && (
            <li className="elementNavBar" id="profileItem">
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <Avatar
                  alt="profile photo "
                  src="https://pm1.aminoapps.com/6433/2d53860cc9f31563802a703e639488110518b69c_hq.jpg"
                  className="profile-photo"
                />{' '}
              </Button>

              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}>
                <MenuItem onClick={handleClose}>
                  <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <button onClick={() => dispatch(usersSliceActions.isLogedOut())}>Logout</button>
                </MenuItem>
              </Menu>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
