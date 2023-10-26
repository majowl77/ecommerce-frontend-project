import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { productDetailsAtions } from '../../redux/slices/Slices/productDetailsSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../types/type'

export default function ProductDetails() {
  const { id } = useParams()
  console.log(id)
  const productDetails = useSelector((state: RootState) => state.productsR.productList)
  const isLoading = useSelector((state: RootState) => state.productDetails.isLoading)
  const errorMessage = useSelector((state: RootState) => state.productsR.error)
  const currentProduct = productDetails.find((product) => product.id === Number(id))

  // handling the failure
  if (errorMessage && !productDetails) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{errorMessage}, Company not found.</Alert>
      </Stack>
    )
  }
  return (
       <div className="oneProduct"> 
     products Details
     <div>  
       <h1> {currentProduct?.id}</h1>
       <p> {currentProduct?.image}</p> 
       <p> {currentProduct?.description}</p>
       </div>
      </div>

  )}
