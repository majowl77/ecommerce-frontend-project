import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import RemoveIcon from '@mui/icons-material/Remove'
import { Product } from '../../types/products/productsTypes'
interface CartItemProps {
  item: {
    _id: string
    product: Product
    quantity: number
  }
  onRemove: (productId: string) => void
  onIncrease: (productId: string) => void
  onDecrease: (productId: string) => void
}
const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="cartItem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        boxShadow={0}
        padding={2}
        marginBottom={0}>
        <img src={item.product.image} alt={item.product.name} style={{ width: '100px' }} />
        <div>
          <Typography variant="h6">{item.product.name}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">{item.product.price * item.product.quantity}$</Typography>
        </div>
        <div className="cartButtons">
          <IconButton onClick={() => onRemove(item.product._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onIncrease(item.product._id)}>
            <AddIcon />
          </IconButton>
          {item.quantity >= 0 && item.quantity}
          <IconButton onClick={() => onDecrease(item.product._id)}>
            <RemoveIcon />
          </IconButton>
        </div>
      </Box>
    </div>
  )
}

export default CartItem
