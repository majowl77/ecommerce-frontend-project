import * as React from 'react'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import Orders from '../adminOrders/Orders'
import AdminProducts from '../adminProducts/AdminProducts'
import AdminCategories from '../adminCategories/AdminCategories'
import { RootState } from '../../../redux/store'
import AdminUsers from '../adminUsers/AdminUsers'

export default function AdminMangement() {
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
    console.log('popup state ', duringPopUp)
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
    <Box
      component="main"
      sx={{
        flexGrow: 1
      }}>
      <div className="adminPage">
        <div className="adminRightDashborad">
          {/* the toggleButtons */}
          <div className="">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ width: '100%' }}>
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
          <div className="componentContainer">
            {isOrders && <Orders />}
            {isProduct && <AdminProducts />}
            {isCategory && <AdminCategories />}
            {isUsers && <AdminUsers />}
          </div>
        </div>
      </div>
    </Box>
  )
}
