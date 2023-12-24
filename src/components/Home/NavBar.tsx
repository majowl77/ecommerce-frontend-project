import React, { useEffect, useState } from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { usersSliceActions } from '../../redux/slices/user/userSlice'
import { cartSliceAction } from '../../redux/slices/cart/cartSlice'
import { ROLES } from '../../types/users/usersType'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    vertical: 'top',
    horizontal: 'right',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const isLogedIn = useSelector((state: RootState) => state.usersR.isLogedIn)
  const decodedUser = useSelector((state: RootState) => state.usersR.decodedUser)
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartProducts)
  const cart = useSelector((state: RootState) => state.cartReducer)
  const isNavBarInHomePage = useSelector((state: RootState) => state.navBarR.isNavBarInHome)
  const [scrollBackground, setScrollBackground] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    const handleScroll = () => {
      setScrollBackground(window.scrollY > 700)
    }
    window.addEventListener('scroll', handleScroll)
    console.log('decodedUser', decodedUser)
    console.log('isLogedIn', isLogedIn)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [decodedUser])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    dispatch(usersSliceActions.isLogedOut())
    dispatch(cartSliceAction.clearCartIfLogedOut())
    navigate('/')
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
          {decodedUser && decodedUser.role === ROLES.ADMIN ? (
            <li className="elementNavBar">
              <Link to="/admin"> Admin</Link>
            </li>
          ) : (
            ''
          )}
          {!decodedUser && (
            <li className="elementNavBar" id={isLogedIn ? '' : 'loginItem'}>
              <Link to="/login"> Login</Link>
            </li>
          )}
        </ul>
        <div className="elementNavBar" id="cartItem">
          <Link to="/cart">
            <IconButton aria-label="cart" color="inherit">
              <StyledBadge badgeContent={cart.itemAtCartCounter} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
        <div className="elementNavBar" id="profileItem">
          {decodedUser ? (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <Avatar
                  alt="profile photo "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmKPN7_d0D_NxxRu4H4oSGEp0dAHoQH10VLyTrSrQYOmNSj1dXr32IgNaJRewkDwmC60&usqp=CAU"
                  className="profile-photo"
                />
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
                  <Link onClick={handleLogOut} to="/">
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            ''
          )}
        </div>
      </nav>
    </header>
  )
}
