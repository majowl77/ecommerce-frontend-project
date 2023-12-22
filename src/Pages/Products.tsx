import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Pagination from '@mui/material/Pagination'
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'

import { AppDispatch, RootState } from '../redux/store'
import { getProductsThunk, productsActions } from '../redux/slices/products/productsSlice'
import { Product } from '../types/products/productsTypes'
import { cartSliceAction } from '../redux/slices/cart/cartSlice'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'
import { toast } from 'react-toastify'
import { getAllCategoriesThunk } from '../redux/slices/admin/adminCategorySlice'

export default function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const prodcutsList = useSelector((state: RootState) => state.productsR.productList)
  const categoriesList = useSelector((state: RootState) => state.categoriesR.categoryList)
  const cartList = useSelector((state: RootState) => state.cartReducer.cartProducts)
  const isLoading = useSelector((state: RootState) => state.productsR.isLoading)
  const [sortOption, setSortOprtion] = useState<string>('')
  const [searchKeyWord, setSearchKeyWord] = useState<string>('')
  const [categoryValue, setCategorieValue] = useState<string>('')
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    totalPages: 0
  })
  console.log('🚀 ~ file: Products.tsx:42 ~ Products ~ pageNumber:', pagination.pageNumber)

  dispatch(navBarActions.navBarNotInHomePage())

  //fetching the data form Reducx thunk
  useEffect(() => {
    handleGetProducts()
    dispatch(getAllCategoriesThunk())
  }, [sortOption, categoryValue, searchKeyWord, pagination.pageNumber])

  const handleGetProducts = async () => {
    const res = await dispatch(
      getProductsThunk({
        sortOption,
        categoryValue,
        searchKeyWord,
        pageNumber: pagination.pageNumber
      })
    )
    const { pageNumber, totalPages } = res.payload
    setPagination({ pageNumber, totalPages })
  }
  // search with each letters the user is typing
  function getSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
    console.log('setSearchKeyWord', searchKeyWord)
  }
  const handleCategorieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategorieValue(event.target.value)
  }
  const selectSortChange = (event: SelectChangeEvent) => {
    setSortOprtion(event.target.value)
  }

  //adding a product to a cart
  function addProductToCart(id: string) {
    const productToAdd = prodcutsList.find((product) => product._id === id)
    if (productToAdd != null) {
      dispatch(cartSliceAction.addCartProduct(productToAdd))
      toast.success('Product Added successfully ')

      console.log(cartList)
    }
  }

  // Modify your filteredProductsList to return only the products for the current page
  // const startIndex = (page - 1) * rowsPerPage
  // const endIndex = startIndex + rowsPerPage

  // const productsToDisplay = filteredProductsList.slice(startIndex, endIndex)

  // Apply search and category filtering only to the products to display
  // const filteredProductsToShow = productsToDisplay.filter((product) => {
  //   const matchesSearch = product.name.toLowerCase().includes(searchKeyWord?.toLowerCase() || '')
  //   const matchesCategory =
  //     categorieValue === 'All' || product.categories.includes(Number(categorieValue))
  //   return matchesSearch && matchesCategory
  // })
  return (
    <div className="products">
      <h2>products</h2>
      <div className="productsSection">
        <div className="productsfilteringSection">
          <h1> Filter products</h1>
          <TextField
            label="Search By Name :"
            onChange={getSearchKeyword}
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{ startAdornment: <InputAdornment position="start">Name</InputAdornment> }}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Filter By Gategories</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handleCategorieChange}>
              {categoriesList.map((category) => {
                return (
                  <FormControlLabel
                    value={category._id}
                    control={<Radio />}
                    label={category.name}
                  />
                )
              })}
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="medium" color="secondary">
            <InputLabel id="demo-simple-select-helper-label" color="secondary">
              Sort:
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Sort"
              onChange={selectSortChange}
              color="secondary">
              <MenuItem value="desc" color="secondary">
                Price: Hight to Low
              </MenuItem>
              <MenuItem value="asc" color="secondary">
                Price: Low to Hight
              </MenuItem>
              <MenuItem value="newest" color="secondary">
                Newet products
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="productsListContainer">
          {isLoading ? (
            // <div>
            //   <Box sx={{ display: 'flex' }}>
            //     {' '}
            //     <CircularProgress size="sm" />{' '}
            //   </Box>
            // </div>
            ''
          ) : (
            <ul className="productsList">
              {prodcutsList &&
                prodcutsList.length > 0 &&
                prodcutsList.map((product) => (
                  <li key={product._id} className="productCard">
                    <div className="productsImageContainer">
                      <img src={product.image} className="productImage" />
                    </div>
                    <div className="productNamePrice">
                      <h1> {product.name}</h1>
                      <p> {product.price}$</p>
                      <div className="productsButton">
                        <button onClick={() => addProductToCart(product._id)}> Buy</button>
                        <Link to={`/products/product-detail/${product._id}`}>
                          <button id="linkToProductDetails"> More Details... </button>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className="pagination">
        <Pagination
          count={pagination.totalPages}
          variant="outlined"
          page={pagination.pageNumber}
          onChange={(event, value) => setPagination({ ...pagination, pageNumber: value })}
        />
      </div>
    </div>
  )
}
