import React from 'react'
import NavBar from '../home/NavBar'

import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { RootState } from '../../redux/store'
import { cartSliceAction } from '../../redux/slices/cart/cartSlice'
import { Paper } from '@mui/material'

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
    dispatch(cartSliceAction.decreaseQuantity(productId))
  }

  return (
    <div>
      <NavBar />
      <div> </div>
      <div>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            onRemove={handleRemove}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        ))}
      </div>
    </div>
  )
}

export default Cart
