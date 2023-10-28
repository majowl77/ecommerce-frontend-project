import React from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    vertical: 'top',
    horizontal: 'right',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))
export default function NavBar() {
  const cartCounter = useSelector((state: RootState) => state.cartReducer.cartCounter)
  return (
    <header>
      <nav className="navBarElements">
        <h3> GreenPlant</h3>
        <ul className="listNavBar">
          <li className="elementNavBar">
            <Link to="/"> Home</Link>
          </li>
          <li className="elementNavBar">
            <Link to="/Products"> Products</Link>
          </li>
          <li className="elementNavBar">
            <Link to="/"> About Us</Link>
          </li>
          <li className="elementNavBar">
            <Link to="/Admin"> Admin</Link>
          </li>
          <li className="elementNavBar" id="loginItem">
            <Link to="/Login"> Login</Link>
          </li>
          <li className="elementNavBar" id="cartItem">
            <Link to="/Cart">
              <IconButton aria-label="cart" color="inherit">
                <StyledBadge badgeContent={cartCounter} color="error">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
