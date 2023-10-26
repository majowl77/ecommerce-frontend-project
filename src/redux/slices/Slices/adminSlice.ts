import { createSlice } from '@reduxjs/toolkit'

import { Product, ProductState } from '../../../types/type'

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false
}

export const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    }
  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess } = adminSlice.actions

export default adminSlice.reducer
