import React, { useState } from 'react'
import NavBar from '../components/home/NavBar'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import AdminLeftDashborad from '../components/admin/AdminLeftDashborad'
import Orders from '../components/admin/adminOrders/Orders'
import AdminProducts from '../components/admin/adminProducts/AdminProducts'
import { AppBar, Toolbar } from '@material-ui/core'
import AdminCategories from '../components/admin/adminCategories/AdminCategories'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AdminUsers from '../components/admin/users/AdminUsers'

export default function Admin() {
  // for product PopUP :
  const productPopUp = useSelector((state: RootState) => state.adminR.popUp)
  const categoryPopUp = useSelector((state: RootState) => state.categoriesR.popUp)
  const duringPopUp = productPopUp || categoryPopUp ? ' during-popup' : ''

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
    setIsCategory(false)
    setIsUsers(false)
    console.log(isOrders)
  }

  // for Product Managing :
  const [isProduct, setIsProduct] = useState(true)
  function HandleProductDashborad() {
    setIsProduct(true)
    setIsOrders(false)
    setIsCategory(false)
    setIsUsers(false)
    console.log(isProduct)
  }
  // for Category Managing :
  const [isCategory, setIsCategory] = useState(false)
  function HandleCategoryDashborad() {
    setIsCategory(true)
    setIsProduct(false)
    setIsOrders(false)
    setIsUsers(false)
    console.log(isProduct)
  }
  // for Category Managing :
  const [isUsers, setIsUsers] = useState(false)
  function HandleUsersDashborad() {
    setIsUsers(true)
    setIsCategory(false)
    setIsProduct(false)
    setIsOrders(false)
    console.log(isProduct)
  }
  return (
    <div className={'adminMainPage' + duringPopUp}>
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
              <ToggleButton
                onClick={HandleUsersDashborad}
                value="users"
                style={{ padding: '20px 104px' }}>
                Users
              </ToggleButton>
              <ToggleButton
                onClick={HandleOrderDashborad}
                value="orders"
                style={{ padding: '20px 104px' }}>
                Orders
              </ToggleButton>
              <ToggleButton
                onClick={HandleCategoryDashborad}
                value="categories"
                style={{ padding: '20px 104px' }}>
                Categories
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="component Container">
            {isOrders && <Orders />}
            {isProduct && <AdminProducts />}
            {isCategory && <AdminCategories />}
            {isUsers && <AdminUsers />}
          </div>
        </div>
      </div>
    </div>
  )
}
