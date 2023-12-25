import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import SecondaryListItems from '../components/admin/adminDrawer/SecondaryListItems'
import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Orders from '../components/admin/adminOrders/Orders'
import AdminProducts from '../components/admin/adminProducts/AdminProducts'
import AdminCategories from '../components/admin/adminCategories/AdminCategories'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AdminUsers from '../components/admin/adminUsers/AdminUsers'
import { AppBar, Drawer } from '../components/admin/adminDrawer/AdminDrawer'
import AdminMangement from '../components/admin/adminMangement/AdminMangement'
import MainListItems from '../components/admin/adminDrawer/MainListItems'
import AdminAnayltics from '../components/admin/adminAnayltics/AdminAnayltics'

export default function Admin() {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  // for product PopUP :
  const productPopUp = useSelector((state: RootState) => state.adminR.popUp)
  const admin = useSelector((state: RootState) => state.adminR)

  const categoryPopUp = useSelector((state: RootState) => state.categoriesR.popUp)
  const duringPopUp = productPopUp || categoryPopUp ? ' during-popup' : ''

  return (
    <div className={'adminMainPage' + duringPopUp}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open} className="adminAppBar">
          <Toolbar
            sx={{
              pr: '24px' // keep right padding when drawer closed
            }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              <h1 id="adminPageTitle">Admin Dashborad </h1>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} className="leftDrawer">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
          </List>
        </Drawer>
        {admin.adminAnaylitcs && <AdminAnayltics />}
        {admin.adminMangement && <AdminMangement />}
      </Box>
    </div>
  )
}
