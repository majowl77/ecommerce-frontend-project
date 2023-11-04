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
import { productsActions } from '../redux/slices/products/productsSlice'
import { Product } from '../types/type'
import { cartSliceAction } from '../redux/slices/cart/cartSlice'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'
import { toast } from 'react-toastify'

export default function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/products.json'
  const prodcutsList = useSelector((state: RootState) => state.productsR.productList)
  const cartList = useSelector((state: RootState) => state.cartReducer.cartProducts)
  const errorMessage = useSelector((state: RootState) => state.productsR.error)
  const isLoading = useSelector((state: RootState) => state.productsR.isLoading)
  const [searchKeyWord, setSearchKeyWord] = useState<null | string>(null)
  const [categorieValue, setCategorieValue] = useState<null | string>('All')
  const isProductAdded = useSelector((state: RootState) => state.adminR.isProductAdded)
  const newProduct = useSelector((state: RootState) => state.adminR.newProduct)
  dispatch(navBarActions.navBarNotInHomePage())

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
      <div className="productsListContainer">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
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
  // handel new product by the admin
  const addnewProduct = () => {
    if (newProduct != null) {
      dispatch(productsActions.addProduct({ newProduct }))
    }
  }
  // search with each letters the user is typing
  function getSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
    console.log(searchKeyWord)
  }
  const handleCategorieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategorieValue(event.target.value)
    console.log(categorieValue)
  }
  // search featuer and filter by categories
  const filterProducts = (
    searchKeyword: string | null,
    categorieValue: string | null,
    products: Product[]
  ) => {
    let newProductsList = products.slice()
    if (searchKeyword !== null) {
      newProductsList = newProductsList.filter((product) =>
        product.name.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase())
      )
    }
    if (categorieValue !== 'All') {
      newProductsList = newProductsList.filter((product) =>
        product.categories.includes(Number(categorieValue))
      )
    }
    return newProductsList
  }
  const filteredProductsList = filterProducts(searchKeyWord, categorieValue, prodcutsList)

  // sorting a list by the price of the prodcuts
  const selectChange = (event: SelectChangeEvent) => {
    dispatch(productsActions.getSelectedSort(event.target.value))
    console.log(event.target.value)
  }
  //adding a product to a cart
  function addProductToCart(id: number) {
    const productToAdd = prodcutsList.find((product) => product.id === id)
    if (productToAdd != null) {
      dispatch(cartSliceAction.addCartProduct(productToAdd))
      toast.success('Product Added successfully ')

      console.log(cartList)
    }
  }

  // pagination feature
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(5) // Number of items per page

  // Modify your filteredProductsList to return only the products for the current page
  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const productsToDisplay = filteredProductsList.slice(startIndex, endIndex)

  // Apply search and category filtering only to the products to display
  const filteredProductsToShow = productsToDisplay.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchKeyWord?.toLowerCase() || '')
    const matchesCategory =
      categorieValue === 'All' || product.categories.includes(Number(categorieValue))
    return matchesSearch && matchesCategory
  })
  return (
    <div className="products">
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Filter By Gategories</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handleCategorieChange}>
              <FormControlLabel value="1" control={<Radio />} label="Natural Plants" />
              <FormControlLabel value="2" control={<Radio />} label="Plant Accessories" />
              <FormControlLabel value="3" control={<Radio />} label="Artificial Plants" />
              <FormControlLabel value="All" control={<Radio />} label="All" />
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
              onChange={selectChange}
              color="secondary">
              <MenuItem value="highttolow" color="secondary">
                Price: Hight to Low
              </MenuItem>
              <MenuItem value="lowtohigh" color="secondary">
                Price: Low to Hight
              </MenuItem>
              <MenuItem value="All" color="secondary">
                Price: All
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="productsListContainer">
          <ul className="productsList">
            {filteredProductsToShow &&
              filteredProductsToShow.length > 0 &&
              filteredProductsToShow.map((product) => (
                <li key={product.id} className="productCard">
                  <div className="productsImageContainer">
                    <img src={product.image} className="productImage" />
                  </div>
                  <div className="productNamePrice">
                    <h1> {product.name}</h1>
                    <p> {product.price}$</p>
                    <div className="productsButton">
                      <button onClick={() => addProductToCart(product.id)}> Buy</button>
                      <Link to={`/products/product-detail/${product.id}`}>
                        <button id="linkToProductDetails"> More Details... </button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="pagination">
        <Pagination
          count={Math.ceil(filteredProductsList.length / rowsPerPage)}
          variant="outlined"
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </div>
    </div>
  )
}
