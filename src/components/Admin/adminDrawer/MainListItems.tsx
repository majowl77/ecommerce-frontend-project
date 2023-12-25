import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import { Link } from 'react-router-dom'
import AdminMangement from '../adminMangement/AdminMangement'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { adminSliceAction } from '../../../redux/slices/admin/adminSlice'

const MainListItems = () => {
  const dispatch = useDispatch<AppDispatch>()

  function handlePageCahnge(pageName: string) {
    console.log('🚀 ~ file: MainListItems.tsx:24 ~ handlePageCahnge ~ pageName:', pageName)
    dispatch(adminSliceAction.adminPageHandel(pageName))
  }
  return (
    <div>
      <React.Fragment>
        <ListItemButton onClick={() => handlePageCahnge('analyitcs')}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>
        <ListItemButton onClick={() => handlePageCahnge('mangement')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Managemaent" />
        </ListItemButton>
      </React.Fragment>
    </div>
  )
}

export default MainListItems
