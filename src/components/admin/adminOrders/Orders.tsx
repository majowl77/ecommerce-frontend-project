import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton } from '@mui/material'

import { AppDispatch, RootState } from '../../../redux/store'
import { deleteOrderThunk, getAllOrdersThunk } from '../../../redux/slices/admin/adminSlice'
import { Order } from '../../../types/orders/orderType'

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

  //deleting a category
  async function handleDelete(orderId: Order['_id']) {
    if (orderId != null) {
      try {
        const res = await dispatch(deleteOrderThunk(orderId)).unwrap()
        toast.success('Order deleted successfully !')
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error('somthing went wrong' + error)
          return
        }
        toast.error("Can't delete the order!." + error)
      }
    }
  }

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
              <TableCell>Order Status</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Delete Order</TableCell>
              <TableCell> Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.purchasedAt}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>
                  <IconButton className="adminButton" onClick={() => handleDelete(order._id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button size="small" color="success">
                    More Info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  )
}
