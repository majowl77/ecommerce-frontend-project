import React from 'react'
import NavBar from '../Home/NavBar'
import { ProductsManager } from '../ProductsManager'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Admin() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <div >
      <NavBar />
      Admins room 
      <div> 
        left Dashboard
        </div> 
        <div>
          <h1> the work is here </h1>
          <div>     <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="products">Products</ToggleButton>
      <ToggleButton value="users">Users</ToggleButton>
      <ToggleButton value="orders">Orders</ToggleButton>
      <ToggleButton value="categories">Categories</ToggleButton>

    </ToggleButtonGroup> </div>
        </div>
    </div>
  )
}
