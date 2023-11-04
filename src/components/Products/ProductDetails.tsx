import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import WestIcon from '@mui/icons-material/West'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import LightModeIcon from '@mui/icons-material/LightMode'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { productDetailsAtions } from '../../redux/slices/products/productDetailsSlice'
import { productsActions } from '../../redux/slices/products/productsSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../types/navBar/navBar'
import { Link } from 'react-router-dom'
import { cartSliceAction } from '../../redux/slices/cart/cartSlice'

export default function ProductDetails() {
  const { productId } = useParams()
  console.log('id', productId)
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/products.json'
  const prodcutsList = useSelector((state: RootState) => state.productsR.productList)
  const productDetails = useSelector((state: RootState) => state.productsR.productList)
  const isLoading = useSelector((state: RootState) => state.productsR.isLoading)
  const errorMessage = useSelector((state: RootState) => state.productsR.error)
  const currentProduct = productDetails.find((product) => product.id === Number(productId))
  console.log('product list ', productDetails)
  console.log('product  ', currentProduct)

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
  // handling the failure
  if (errorMessage && !productDetails) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{errorMessage}, Company not found.</Alert>
      </Stack>
    )
  }
  //adding a product to a cart
  function addProductToCart(id: number) {
    const productToAdd = prodcutsList.find((product) => product.id === id)
    if (productToAdd != null) {
      dispatch(cartSliceAction.addCartProduct(productToAdd))
    }
  }
  return (
    <div className="oneProduct">
      {currentProduct && (
        <div className="displayProductsDetails">
          <div className="bottomBorder">
            <div className="backButton">
              <Link to="/products">
                <Button variant="text" color="inherit" startIcon={<WestIcon />}>
                  Back To All Products
                </Button>
              </Link>
            </div>
          </div>
          <div className="insideProductDetails">
            <div className="productDetailsImage">
              <img src={'/' + currentProduct.image} />
            </div>
            <div className="productsInfo">
              <h1 id="productName"> {currentProduct.name}</h1>
              <h6 id="subName"> {currentProduct.subName}</h6>
              <p id="productPrice"> {currentProduct.price}$ </p>
              <p id="productDescription"> {currentProduct.description} </p>
              {currentProduct.sizes.length > 0 && (
                <ButtonGroup variant="outlined" aria-label="outlined button group" color="inherit">
                  <span id="productSize">sizes:</span>
                  {currentProduct.sizes.map((size) => (
                    <Button>{size}</Button>
                  ))}
                </ButtonGroup>
              )}
              <div className="takeCareContainer">
                <div className="productCare">
                  <LightModeIcon />
                  <p> Bright direct light</p>
                </div>
                <div className="productTakeCare">
                  <WaterDropIcon />
                  <p> Every 1-2 weeks</p>
                </div>
                <div className="productTakeCare">
                  <DeviceThermostatIcon />
                  <p> 18°C-30°C </p>
                </div>
              </div>
              <div className="productButton">
                <button id="productDButton" onClick={() => addProductToCart(currentProduct.id)}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
