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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import AddBoxIcon from '@mui/icons-material/AddBox'

import { AppDispatch, RootState } from '../../../redux/store'
import axios from 'axios'
import { adminSliceAction } from '../../../redux/slices/admin/adminSlice'
import { IconButton } from '@mui/material'
import { Product } from '../../../types/type'
import Button from '@mui/material/Button'
import ProductForm from './ProductForm'

export default function AdminProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/products.json'
  const prodcutsList = useSelector((state: RootState) => state.adminR.productItems)
  const errorMessage = useSelector((state: RootState) => state.adminR.error)
  const isLoading = useSelector((state: RootState) => state.adminR.isLoading)
  const popup = useSelector((state: RootState) => state.adminR.popUp)
  const isEditForm = useSelector((state: RootState) => state.adminR.isEditForm)

  //fetching the data form JSON file
  useEffect(() => {
    function fetchProducts() {
      axios
        .get(url)
        .then((response) => dispatch(adminSliceAction.getProductsData(response.data)))
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
    }
  }
  //open Edit product form
  function onEdit(productId: number) {
    dispatch(adminSliceAction.openEditProductForm(productId))
    dispatch(adminSliceAction.setPopUp(true))
  }

  return (
    <div className="adminProductPage">
      <div className="productTable">
        <React.Fragment>
          <Typography
            component="div"
            style={{
              display: 'flex',
              alignItems: 'center', // Vertical alignment
              paddingTop: '40px',
              paddingBottom: '10px'
            }}>
            <h1 className="titleAdminProducts">Products Mangement</h1>
            <h2 className="subTitleAdmin">Total Products: {prodcutsList.length}</h2>
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
                  <TableCell>{product.price}$</TableCell>
                  <TableCell>
                    <IconButton className="adminButton" onClick={() => onRemove(product)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className="adminButton" onClick={() => onEdit(product.id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </div>
      <div id="addNewProduct">
        <Button
          variant="text"
          onClick={() => dispatch(adminSliceAction.setPopUp(true))}
          style={{ color: '#a4b6a6', fontSize: '18px', borderBlockColor: '#889889' }}>
          Add New Product <AddBoxIcon />
        </Button>
      </div>
      <div>{popup && <ProductForm />}</div>
    </div>
  )
}
