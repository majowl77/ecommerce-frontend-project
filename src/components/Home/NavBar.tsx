import React from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
type Theme = {
  theme: number
}
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    vertical: 'top',
    horizontal: 'right',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))
export default function NavBar() {
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
          <li className="elementNavBar" id="loginItem">
            <Link to="/Login"> Login</Link>
          </li>
          <li className="elementNavBar" id="cartItem">
            <IconButton aria-label="cart" color="inherit">
              <StyledBadge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </li>
        </ul>
      </nav>
    </header>
  )
}
