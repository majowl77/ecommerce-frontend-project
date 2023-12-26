import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import WestIcon from '@mui/icons-material/West'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import CartItem from './CartItem'
import { AppDispatch, RootState } from '../../redux/store'
import {
  cartSliceAction,
  createNewOrderThunk,
  deleteCartItemThunk,
  getCartItemsThunk,
  updateProductQuantity
} from '../../redux/slices/cart/cartSlice'
import { navBarActions } from '../../redux/slices/navbar/navbarSlice'
import { getDecodedTokenFromStorage } from '../../utils/token'
import CartCheckoutModal from './CartCheckoutModal'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartProducts)
  const cart = useSelector((state: RootState) => state.cartReducer)
  const decodedUser = getDecodedTokenFromStorage()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  dispatch(navBarActions.navBarNotInHomePage())

  useEffect(() => {
    dispatch(getCartItemsThunk())
  }, [])

  const handleRemove = (productId: string) => {
    if (productId != null) {
      dispatch(deleteCartItemThunk(productId))
    }
  }

  const handleIncrease = async (productId: string) => {
    const increase = 'inc'
    const res = await dispatch(updateProductQuantity({ productId, updateType: increase }))
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success(res.payload.message)
      return
    }
    if (res.meta.requestStatus === 'rejected') {
      toast.error(res.payload.message)
      return
    }
  }

  const handleDecrease = async (productId: string) => {
    const cartProduct = cartItems.find((item) => item.product._id === productId)
    if (cartProduct?.quantity === 1) {
      const removedProduct = cartItems.find((product) => product.product._id === productId)
      if (removedProduct != null) {
        dispatch(cartSliceAction.removeProduct(productId))
      }
    }
    const decrease = 'dec'
    const res = await dispatch(updateProductQuantity({ productId, updateType: decrease }))
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success(res.payload.message)
      return
    }
    if (res.meta.requestStatus === 'rejected') {
      toast.error(res.payload.message)
      return
    }
  }

  const handleCheckout = async (cartId: string) => {
    console.log('🚀 ~ file: Cart.tsx:66 ~ handleCheckout ~ cartId:', cartId)
    if (decodedUser === null) {
      return toast.warn('Please Login first to checkout ')
    }
    try {
      const res = await dispatch(createNewOrderThunk(cartId)).unwrap()
      console.log('🚀 ~ file: Cart.tsx:73 ~ handleCheckout ~ res:', res)
      const msg = res.message
      setOpen(true)
      setTimeout(() => {
        navigate('/')
      }, 10000)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('somthing went wrong' + error)
        return
      }
      toast.error('Checkout failed.' + error)
    }
  }

  return (
    <div className="cartPage">
      {!decodedUser || cart.cartProducts.length === 0 ? (
        <div className="emptyCart">
          {/* <Typography variant="h2" gutterBottom marginBottom={0}>
            cart is empty!
          </Typography> */}
          <img src="https://majedah-bucket.s3.eu-west-2.amazonaws.com/cartIsEmpty-1703591430371-603300689.png" />
        </div>
      ) : (
        <div className="cartListContainer">
          <div className="cartList">
            <div className="cartListTitle">
              <h1>Shopping Cart </h1>
              <p> {cartItems.length} items</p>
            </div>
            <div className="scrollCartItems">
              <div>
                <Table size="small">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.product._id}>
                        <TableCell>
                          <CartItem
                            key={item.product._id}
                            item={item}
                            onRemove={() => handleRemove(item.product._id)}
                            onIncrease={() => handleIncrease(item.product._id)}
                            onDecrease={() => handleDecrease(item.product._id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="orderSummary">
            <div className="orderSummaryTitle">
              <h2>Order Summery </h2>
            </div>

            <div className="itemsPrice">
              <p> Items {cartItems.length} </p>
              <p>{cart.totalPrice}$</p>
            </div>

            <div className="shippingTypeContainer">
              <p id="shipping"> Shipping </p>
              <div className="shippingType">
                <FormControl fullWidth>
                  <Select value={1} inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem value={1}>Standered Delivery - 15$</MenuItem>
                    <MenuItem value={2}>Fast Delivery - 35$</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="shippingTypeContainer">
              <p id="shipping"> Promo Code </p>
              <div className="shippingType">
                <FormControl fullWidth>
                  <TextField
                    id="filled-search"
                    label="Enter your code"
                    type="search"
                    variant="filled"
                  />
                  <Button
                    variant="outlined"
                    sx={{ marginTop: '20px', padding: '10px' }}
                    color="success">
                    Apply
                  </Button>
                </FormControl>
              </div>
            </div>
            <div className="totlaCost">
              <p> discount </p>
              <p>-35$</p>
            </div>
            <div className="restOfSummery">
              <p> Total Cost </p>
              <p>{cart.totalPrice - 35}$</p>
            </div>
            <div className="checkout">
              <div id="checkoutButton">
                <Button
                  variant="contained"
                  sx={{ marginTop: '20px', padding: '10px 100px' }}
                  color="success"
                  onClick={() => {
                    handleCheckout(cart.cartId)
                  }}>
                  Checkout
                </Button>
              </div>
            </div>
            <div className="backButton">
              <Link to="/products">
                <Button variant="text" color="inherit" startIcon={<WestIcon />}>
                  Back To All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {open && <CartCheckoutModal open={open} handleOpen={handleOpen} handleClose={handleClose} />}
    </div>
  )
}

export default Cart
