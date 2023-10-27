import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import CircularProgress from '@mui/material/CircularProgress'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { AppDispatch, RootState } from '../../redux/store'
import axios from 'axios'
import { adminSliceAction } from '../../redux/slices/adminSlice'
import { IconButton } from '@mui/material'
import { Product } from '../../types/type'
import Button from '@mui/material/Button'

export default function AdminProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/products.json'
  const prodcutsList = useSelector((state: RootState) => state.adminR.productItems)
  const errorMessage = useSelector((state: RootState) => state.adminR.error)
  const isLoading = useSelector((state: RootState) => state.adminR.isLoading)

  //fetching the data form JSON file
  useEffect(() => {
    function fetchProducts() {
      axios
        .get(url)
        .then((response) => dispatch(adminSliceAction.addProduct(response.data)))
        .catch((error) => dispatch(adminSliceAction.getError(error.message)))
    }
    fetchProducts()
  }, [])
  // handling the request
  if (isLoading === true) {
    return (
      <Box sx={{ display: 'flex', width: 60, height: 23 }}>
        <CircularProgress />
      </Box>
    )
  }
  // error message handling
  if (errorMessage && prodcutsList.length === 0) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{errorMessage}</Alert>
      </Stack>
    )
  }
  //removing a product
  function onRemove(product: Product) {
    if (product != null) {
      dispatch(adminSliceAction.removeProduct({ productId: product.id }))
      console.log(product)
    }
  }
  //removing a product
  function onEdit(product: Product) {}
  return (
    <div>
      <React.Fragment>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          style={{ paddingTop: '40px',paddingBottom:"10px" }}
          gutterBottom>
          Products Information
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product ID </TableCell>
              <TableCell> Image</TableCell>
              <TableCell> Name</TableCell>
              <TableCell> Variants</TableCell>
              <TableCell> Price</TableCell>
              <TableCell> Delete</TableCell>
              <TableCell> Edit</TableCell>
              <TableCell> Add New Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prodcutsList.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img src={product.image} alt="Product Image" id="adminProductImage" />{' '}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.variants}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <IconButton className="adminButton" onClick={() => onRemove(product)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton className="adminButton" onClick={() => onEdit(product)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button variant="text">Add</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>
  )
}
