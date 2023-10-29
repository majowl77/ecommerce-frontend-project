import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Order, Product, ProductState } from '../../types/type'
type AdminState ={
  productItems: Product[],
  error: null | string,
  isLoading: boolean,
  orderList: Order[]
}
const initialState: AdminState = {
  productItems: [],
  error: null,
  isLoading: true,
  orderList: []

}

export const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProductsData: (state, action: PayloadAction<Product[]>) => {
      state.productItems = action.payload
      state.isLoading = false
    },
    addProduct: (state, action: { payload: { product: Product }}) => {
      // let's append the new product to the beginning of the array
      state.productItems = [action.payload.product, ...state.productItems]
      state.isLoading = false
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.productItems.filter((product) => product.id !== action.payload.productId)
      state.productItems = filteredItems
    },
    getOrderData: (state, action: PayloadAction<Order[]>)=>{
      state.orderList = action.payload
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

export default adminSlice.reducer
export const adminSliceAction = adminSlice.actions
