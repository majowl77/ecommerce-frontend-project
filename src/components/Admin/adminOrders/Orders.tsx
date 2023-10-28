import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { AppDispatch, RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { adminSliceAction } from '../../../redux/slices/admin/adminSlice'

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/orders.json'
  const OrderList = useSelector((state: RootState) => state.adminR.orderList)
  //fetching the data form JSON file
  useEffect(() => {
    function fetchProductsData() {
      axios
        .get(url)
        .then((response) => dispatch(adminSliceAction.getOrderData(response.data)))
        .catch((error) => dispatch(adminSliceAction.getError(error.message)))
    }
    fetchProductsData()
  }, [])

  return (
    <React.Fragment>
      <Typography
        component="div"
        style={{
          display: 'flex',
          alignItems: 'center', // Vertical alignment
          paddingTop: '40px',
          paddingBottom: '10px'
        }}>
        <h1 className="titleAdminProducts">Recent Orders</h1>
        <h2 className="subTitleAdmin">Total Orders: {OrderList.length}</h2>
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order ID </TableCell>
            <TableCell>Purchased At</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell> Product ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderList.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.purchasedAt}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>{order.productId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
