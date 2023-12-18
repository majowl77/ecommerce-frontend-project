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
import {
  getSingleProductThunk,
  productDetailsAtions
} from '../../redux/slices/products/productDetailsSlice'
import { productsActions } from '../../redux/slices/products/productsSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../types/products/productsTypes'
import { Link } from 'react-router-dom'
import { cartSliceAction } from '../../redux/slices/cart/cartSlice'

export default function ProductDetails() {
  const { productId } = useParams()
  console.log('id', productId)
  const dispatch = useDispatch<AppDispatch>()
  const product = useSelector((state: RootState) => state.productDetails.product)
  const productList = useSelector((state: RootState) => state.productsR.productList)

  useEffect(() => {
    function fetchSingleProductData() {
      if (typeof productId === 'string') {
        dispatch(getSingleProductThunk(productId))
      }
    }
    fetchSingleProductData()
  }, [])

  //adding a product to a cart
  function addProductToCart(id: number) {
    if (product) {
      const productToAdd = productList.find((pro) => pro._id === id)
      if (productToAdd != null) {
        dispatch(cartSliceAction.addCartProduct(productToAdd))
      }
    }
  }
  return (
    <div className="oneProduct">
      {product && (
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
              <img src={'/' + product.image} />
            </div>
            <div className="productsInfo">
              <h1 id="productName"> {product.name}</h1>
              <h6 id="subName"> {product.subName}</h6>
              <p id="productPrice"> {product.price}$ </p>
              <p id="productDescription"> {product.description} </p>
              {product.sizes.length > 0 && (
                <ButtonGroup variant="outlined" aria-label="outlined button group" color="inherit">
                  <span id="productSize">sizes:</span>
                  {product.sizes.map((size) => (
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
                <button id="productDButton" onClick={() => addProductToCart(product._id)}>
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
