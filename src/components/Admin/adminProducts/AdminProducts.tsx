import React, { useEffect } from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import AddBoxIcon from '@mui/icons-material/AddBox'
import TableContainer from '@mui/material/TableContainer'
import LinearProgress from '@mui/joy/LinearProgress'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'

import { AppDispatch, RootState } from '../../../redux/store'
import {
  adminSliceAction,
  deleteProductThunk,
  getAdminProductsThunk
} from '../../../redux/slices/admin/adminSlice'
import { Product } from '../../../types/products/productsTypes'
import ProductForm from './ProductForm'
import { getSingleProductThunk } from '../../../redux/slices/products/productDetailsSlice'

export default function AdminProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const prodcutsList = useSelector((state: RootState) => state.adminR.productItems)
  const isLoading = useSelector((state: RootState) => state.adminR.isLoading)
  const popup = useSelector((state: RootState) => state.adminR.popUp)
  const isEditForm = useSelector((state: RootState) => state.adminR.isEditForm)

  const productPopUp = useSelector((state: RootState) => state.adminR.popUp)
  const categoryPopUp = useSelector((state: RootState) => state.categoriesR.popUp)
  const duringPopUp = productPopUp || categoryPopUp ? ' during-popup' : ''

  useEffect(() => {
    const handleGetProducts = async () => {
      dispatch(getAdminProductsThunk())
    }
    handleGetProducts()
  }, [])

  //** deleting a product */
  function handleDeletingProduct(productId: Product['_id']) {
    if (productId != null) {
      dispatch(deleteProductThunk(productId))
    }
  }
  //open Edit product form
  function onEdit(productId: string) {
    dispatch(adminSliceAction.openEditProductForm(productId))
    dispatch(adminSliceAction.setPopUp(true))
    function fetchSingleProductData() {
      if (typeof productId === 'string') {
        dispatch(getSingleProductThunk(productId))
      }
    }
    fetchSingleProductData()
  }

  return (
    <div className="adminProductPage">
      {isLoading === true && <LinearProgress color="success" value={40} variant="solid" />}
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
          <TableContainer sx={{ maxHeight: '400px' }}>
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
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>
                      <img src={product.image} alt="Product Image" id="adminProductImage" />{' '}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.variants}</TableCell>
                    <TableCell>{product.price}$</TableCell>
                    <TableCell>
                      <IconButton
                        className="adminButton"
                        onClick={() => handleDeletingProduct(product._id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton className="adminButton" onClick={() => onEdit(product._id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {prodcutsList.length === 0 && isLoading === false && (
                  <div>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="warning">No product in stock!</Alert>
                    </Stack>
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
