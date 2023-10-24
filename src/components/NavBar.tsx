import React from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
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
    <div>
      <nav className="navBarElements">
        <h3> GreenPlant</h3>
        <ul className="listNavBar">
          <li className="elementNavBar"> Home </li>
          <li className="elementNavBar"> Products </li>
          <li className="elementNavBar"> About Us </li>
          <li className="elementNavBar" id="loginItem"> Login </li>
          <li className="elementNavBar" id="cartItem">
            <IconButton aria-label="cart" color="inherit">
              <StyledBadge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </li>
        </ul>
      </nav>
    </div>
  )
}
