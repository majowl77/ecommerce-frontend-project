import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import RemoveIcon from '@mui/icons-material/Remove'
import { Product } from '../../types/navBar/navBar'
interface CartItemProps {
  product: Product
  onRemove: (productId: number) => void
  onIncrease: (productId: number) => void
  onDecrease: (productId: number) => void
}
const CartItem: React.FC<CartItemProps> = ({ product, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="cartItem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        boxShadow={0}
        padding={2}
        marginBottom={0}>
        <img src={product.image} alt={product.name} style={{ width: '100px' }} />
        <div>
          <Typography variant="h6">{product.name}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">{product.price * product.quantity}$</Typography>
        </div>
        <div className="cartButtons">
          <IconButton onClick={() => onRemove(product.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onIncrease(product.id)}>
            <AddIcon />
          </IconButton>
          {product.quantity >= 0 && product.quantity}
          <IconButton onClick={() => onDecrease(product.id)}>
            <RemoveIcon />
          </IconButton>
        </div>
      </Box>
    </div>
  )
}

export default CartItem
