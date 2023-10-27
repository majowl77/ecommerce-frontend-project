import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import NavBar from '../Home/NavBar'
import { AppDispatch, RootState } from '../../redux/store'
import { productsActions } from '../../redux/slices/productsSlice'
import { Product } from '../../types/type'
import { cartSliceAction } from '../../redux/slices/cartSlice'

export default function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/products.json'
  const prodcutsList = useSelector((state: RootState) => state.productsR.productList)
  const cartList = useSelector((state: RootState) => state.cartReducer.cartProducts)
  const errorMessage = useSelector((state: RootState) => state.productsR.error)
  const isLoading = useSelector((state: RootState) => state.productsR.isLoading)
  const [searchKeyWord, setSearchKeyWord] = useState('')

  //fetching the data form JSON file
  useEffect(() => {
    function fetchProductsData() {
      axios
        .get(url)
        .then((response) => dispatch(productsActions.getProductsData(response.data)))
        .catch((error) => dispatch(productsActions.getError(error.message)))
    }
    fetchProductsData()
  }, [])
  // handling the request
  if (isLoading === true) {
    return (
      <Box sx={{ display: 'flex' }}>
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

  // search with each letters the user is typing
  function getSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
    console.log(searchKeyWord)
  }

  // search featuer
  const filterProducts = (searchKeyword: string, products: Product[]) => {
    if (searchKeyword != null) {
      const newProductsList = products.filter((product) =>
        product.name.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase())
      )
      return newProductsList
    }
  }
  const filteredProductsList = filterProducts(searchKeyWord, prodcutsList)
  // sorting a list by the price of the prodcuts
  const selectChange = (event: SelectChangeEvent) => {
    dispatch(productsActions.getSelectedSort(event.target.value))
  }
  // 
  function addProductToCart(id:number){
    dispatch(cartSliceAction.addCartCounter())
    const productToAdd = prodcutsList.find((product) => product.id === id)
    if(productToAdd != null){
      dispatch(cartSliceAction.addCartProduct(productToAdd));
      console.log(cartList)
    }
  }
  return (
    <div className="products">
      <NavBar />
      <h2>products</h2>
      <div className="productsSection">
        <div className="productsfilteringSection">
          <h1> Filter products</h1>
          {/* adding search features  */}
          <TextField
            label="Search By Name :"
            onChange={getSearchKeyword}
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{ startAdornment: <InputAdornment position="start">Name</InputAdornment> }}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Natural Plants" />
            <FormControlLabel control={<Checkbox />} label="Plant Accessories" />
            <FormControlLabel control={<Checkbox />} label="Artificial Plants" />
          </FormGroup>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="medium" color="secondary">
            <InputLabel id="demo-simple-select-helper-label" color="secondary">
              Sort:
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Sort"
              onChange={selectChange}
              color="secondary">
              <MenuItem value="highttolow" color="secondary">
                Price: Hight to Low
              </MenuItem>
              <MenuItem value="lowtohigh" color="secondary">
              Price: Low to Hight 
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="productsListContainer">
          <ul className="productsList">
            {filteredProductsList &&
              filteredProductsList.length > 0 &&
              filteredProductsList.map((product) => (
               
                  <li key={product.id} className="productCard">
                    <img src={product.image} />
                    <h1> {product.name}</h1>
                    <p> {product.price}</p>
                    <p>
                      <button onClick={()=> addProductToCart(product.id)}> Buy</button>
                      <Link to={`/ProductDetails/${product.id}`}> <button id="linkToProductDetails"> More Details </button> </Link>
                     </p>
                  </li>

              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
