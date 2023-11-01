import React from 'react'
import NavBar from '../home/NavBar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import WestIcon from '@mui/icons-material/West'

import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { RootState } from '../../redux/store'
import { cartSliceAction } from '../../redux/slices/cart/cartSlice'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartProducts)
  const dispatch = useDispatch()

  const handleRemove = (productId: number) => {
    const removedProduct = cartItems.find((product) => product.id === productId)
    if (removedProduct != null) {
      dispatch(cartSliceAction.removeProduct(productId))
      console.log(removedProduct)
    }
  }

  const handleIncrease = (productId: number) => {
    dispatch(cartSliceAction.increaseQuantity(productId))
  }

  const handleDecrease = (productId: number) => {
    const cartProduct = cartItems.find((product) => product.id === productId)
    if (cartProduct?.quantity === 1) {
      handleRemove(productId)
    }
    dispatch(cartSliceAction.decreaseQuantity(productId))
  }
  const total = cartItems.reduce((totalPrice, secondItem) => {
    return (totalPrice += secondItem.price * secondItem.quantity)
  }, 0)
  return (
    <div className="cartPage">
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
                    <TableRow key={item.id}>
                      <TableCell>
                        <CartItem
                          key={item.id}
                          product={item}
                          onRemove={() => handleRemove(item.id)}
                          onIncrease={handleIncrease}
                          onDecrease={handleDecrease}
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
            <p>
              {cartItems.reduce((totalPrice, secondItem) => {
                return (totalPrice += secondItem.price)
              }, 0)}
              $
            </p>
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
            <p>{total - 35}$</p>
          </div>
          <div className="checkout">
            <div id="checkoutButton">
              <Button
                variant="contained"
                sx={{ marginTop: '20px', padding: '10px 100px' }}
                color="success">
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
    </div>
  )
}

export default Cart
