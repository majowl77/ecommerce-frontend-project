import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import api from '../../../api'
import { CartInitialState } from '../../../types/cart/cartType'

const initialState: CartInitialState = {
  cartProducts: [],
  isEmpty: true,
  itemAtCartCounter: 0,
  quantity: 0,
  error: null,
  isLoading: false,
  totalPrice: 0,
  cartId: '',
  message: null
}

export const getCartItemsThunk = createAsyncThunk('cart', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/cart/getUserCartItems`)
    console.log('🚀 ~ file: cartSlice.ts:22 ~ getCartItemsThunk ~ res:', res.data)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
  }
})

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (
    { productId, quantity = 1 }: { productId: string; quantity?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(`/api/cart/addToCart`, { productId, quantity })
      console.log('🚀 ~ file: cartSlice.ts:32 ~ addItemToCart ~ res:', res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const updateProductQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async (
    { productId, updateType }: { productId: string; updateType: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/api/cart/updateQuantity`, { productId, updateType })

      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const deleteCartItemThunk = createAsyncThunk(
  'cart/delete',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/cart/deleteFromCart`, { productId })
      return res.data
      console.log('🚀 ~ file: cartSlice.ts:66 ~ res deleteCartItemThunk:', res.data)
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const createNewOrderThunk = createAsyncThunk(
  'cart/createNewOrder',
  async (cartId: string, { rejectWithValue }) => {
    try {
      console.log('🚀 ~ file: cartSlice.ts:76 ~ cartId:', cartId)
      const res = await api.post(`/api/orders/createNewOrder`, { cartId })
      console.log('🚀 ~ file: cartSlice.ts:79 ~ res:', res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<string>) => {
      state.cartProducts = state.cartProducts.filter((item) => item.product._id !== action.payload)
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemToIncrease = state.cartProducts.find((item) => item.product._id === action.payload)
      if (itemToIncrease) {
        itemToIncrease.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemToIncrease = state.cartProducts.find((item) => item.product._id === action.payload)
      if (itemToIncrease) {
        itemToIncrease.quantity -= 1
      }
    },
    clearCartIfLogedOut: (state) => {
      state.cartProducts = []
      state.itemAtCartCounter = null
    }
  },
  extraReducers: (builder) => {
    // --- handle getting all the cart items  ---
    builder.addCase(getCartItemsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCartItemsThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getCartItemsThunk.fulfilled, (state, action) => {
      state.cartProducts = action.payload.cartItems
      state.totalPrice = action.payload.totalPrice
      state.itemAtCartCounter = action.payload.itemsCount
      state.cartId = action.payload.cartId
      state.isLoading = false
    })
    // --- handle adding product to the cart  ---
    builder.addCase(addItemToCart.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addItemToCart.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.cartProducts = action.payload.cart.products
      state.totalPrice = action.payload.totalPrice
      state.itemAtCartCounter = action.payload.itemsCount
      state.isLoading = false
      return state
    })
    // --- handle increasing or decreasing product qunatity in the cart  ---
    builder.addCase(updateProductQuantity.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateProductQuantity.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(updateProductQuantity.fulfilled, (state, action) => {
      const updatedCart = state.cartProducts.map((item) => {
        if (item.product._id === action.payload.updatedCartItem.product) {
          item.quantity = action.payload.updatedCartItem.quantity
        }
        return item
      })
      state.cartProducts = updatedCart
      state.itemAtCartCounter = action.payload.totalCount
      state.isLoading = false
      return state
    })
    // --- handle deleting a product from the cart  ---
    builder.addCase(deleteCartItemThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteCartItemThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(deleteCartItemThunk.fulfilled, (state, action) => {
      state.cartProducts = action.payload.updatedCart.products
      return state
    })
    // --- handle Checkout and placing an order  ---
    builder.addCase(createNewOrderThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createNewOrderThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(createNewOrderThunk.fulfilled, (state, action) => {
      state.cartProducts = []
      state.itemAtCartCounter = 0
      state.isLoading = false
      state.message = action.payload.message
      console.log('🚀 ~ file: cartSlice.ts:218 ~ builder.addCase ~ action.payload:', action.payload)

      return state
    })
  }
})

export default cartSlice.reducer
export const cartSliceAction = cartSlice.actions
