import React, { useState } from 'react'
import NavBar from '../components/Home/NavBar'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import AdminLeftDashborad from '../components/Admin/AdminLeftDashborad'
import Orders from '../components/Admin/Orders'
import AdminProducts from '../components/Admin/AdminProducts'
import { AppBar, Toolbar } from '@material-ui/core'

export default function Admin() {
  // add product PopUP :
  const [popUp, setPopUp] = useState(false)
  const duringPopUp = popUp ? ' during-popup' : ''

  // for the toggle buton
  const [alignment, setAlignment] = React.useState('web')
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  // for Order Managing :
  const [isOrders, setIsOrders] = useState(false)
  function HandleOrderDashborad() {
    setIsOrders(true)
    setIsProduct(false)
    console.log(isOrders)
  }

  // for Product Managing :
  const [isProduct, setIsProduct] = useState(true)
  function HandleProductDashborad() {
    setIsProduct(true)
    setIsOrders(false)
    console.log(isProduct)
  }
  return (
    <div className={'adminMainPage' + duringPopUp}>
      Admins room
      <AppBar elevation={0} style={{ backgroundColor: '#a4b6a6' }}>
        <Toolbar>
          <h1 id="adminPageTitle">Admin Dashborad </h1>
        </Toolbar>
      </AppBar>
      <div className="adminPage">
        <div className="adminLeftDashborad">
          <AdminLeftDashborad />
        </div>
        <div className="adminRightDashborad">
          {/* the toggleButtons */}
          <div>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform">
              <ToggleButton
                onClick={HandleProductDashborad}
                value="products"
                style={{ padding: '20px 104px' }}>
                Products
              </ToggleButton>
              <ToggleButton value="users" style={{ padding: '20px 104px' }}>
                Users
              </ToggleButton>
              <ToggleButton
                onClick={HandleOrderDashborad}
                value="orders"
                style={{ padding: '20px 104px' }}>
                Orders
              </ToggleButton>
              <ToggleButton value="categories" style={{ padding: '20px 104px' }}>
                Categories
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="component Container">
            {isOrders && <Orders />}
            {isProduct && <AdminProducts setPopUp={setPopUp} popUp={popUp} />}
          </div>
        </div>
      </div>
    </div>
  )
}
