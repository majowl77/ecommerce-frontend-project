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
import { mainListItems, secondaryListItems } from '../components/admin/adminDrawer/ListItems'
import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Orders from '../components/admin/adminOrders/Orders'
import AdminProducts from '../components/admin/adminProducts/AdminProducts'
import AdminCategories from '../components/admin/adminCategories/AdminCategories'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AdminUsers from '../components/admin/adminUsers/AdminUsers'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
)

export default function Admin() {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
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
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
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
      </Box>
    </div>
  )
}
