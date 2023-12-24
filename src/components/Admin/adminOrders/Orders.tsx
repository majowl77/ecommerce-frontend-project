import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

import { AppDispatch, RootState } from '../../../redux/store'
import { getAllOrdersThunk } from '../../../redux/slices/admin/adminSlice'

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>()
  const orderList = useSelector((state: RootState) => state.adminR.orderList)
  const order = useSelector((state: RootState) => state.adminR)

  useEffect(() => {
    function fetchProductsData() {
      dispatch(getAllOrdersThunk())
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
        <h2 className="subTitleAdmin">Total Orders: {orderList.length}</h2>
      </Typography>
      {orderList.length === 0 && order.isLoading === false ? (
        <div>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="warning">No Order have been made by the users !</Alert>
          </Stack>
        </div>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order ID </TableCell>
              <TableCell>Purchased At</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell> Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.purchasedAt}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>
                  <a href={'#'}> more info</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  )
}
