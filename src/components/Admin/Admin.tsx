import React, { useState } from 'react'
import NavBar from '../Home/NavBar'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import AdminLeftDashborad from './AdminLeftDashborad'
import Orders from './Orders'
import AdminProducts from './AdminProducts'


export default function Admin() {
  // for the toggle buton 
  const [alignment, setAlignment] = React.useState('web')
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  // for Order Managing : 
  const [isOrders, setIsOrders] = useState(false);
  function HandleOrderDashborad(){
    setIsOrders(true);
    setIsProduct(false);
    console.log(isOrders);
  }

    // for Product Managing : 
    const [isProduct, setIsProduct] = useState(true);
    function HandleProductDashborad(){
      setIsProduct(true);
      setIsOrders(false)
      console.log(isProduct);
    }
  return (
    <div >
      <NavBar />
      Admins room
      <div className="adminPage"> 
      <div className="adminLeftDashborad">
      <AdminLeftDashborad />
      </div>
      <div className="adminRightDashborad">
        <h1> the work is here </h1>
        {/* the toggleButtons */}
        <div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            >
            <ToggleButton  onClick={HandleProductDashborad} value="products" style={{ padding: '10px 80px' }} >Products</ToggleButton>
            <ToggleButton value="users" style={{ padding: '10px 80px' }} >Users</ToggleButton>
            <ToggleButton onClick={HandleOrderDashborad} value="orders" style={{ padding: '10px 80px' }} >Orders</ToggleButton>
            <ToggleButton value="categories" style={{ padding: '10px 80px' }}>Categories</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="component Container"> 
        {isOrders &&   <Orders />}
        {isProduct &&   <AdminProducts />}
        </div>
      </div>
      </div>
    </div>
  )
}
