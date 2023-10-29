import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AdminState, Order, Product } from '../../../types/type'



const initialState: AdminState = {
  productItems: [],
  error: null,
  isLoading: true,
  orderList: [],
  productID:null,
  isEditForm: false,
  popUp: false ,
  isProductAdded: false,
  newProduct: null
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
      state.productItems = [action.payload.product, ...state.productItems]
      state.newProduct = action.payload.product
      state.isLoading = false 
      state.isProductAdded= true

    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.productItems.filter((product) => product.id !== action.payload.productId)
      state.productItems = filteredItems
    },
    setPopUp: (state, action: PayloadAction<Boolean>)=>{
      if (action.payload === true){
        state.popUp = true 
      }else if (action.payload === false){
        state.popUp = false 
      }
    },
    openEditProductForm: (state, action:PayloadAction<number> )=>{
      state.productID = action.payload
      state.isEditForm = true 
    },
    closeEditForm: (state)=>{
      state.isEditForm = false 
    },
    editProduct: (state, action: PayloadAction<{ editedProductId: number | null, product: Product }>)=> {
      const { editedProductId, product } = action.payload;
      const productIndex = state.productItems.findIndex((p) => p.id === editedProductId);
      if (productIndex !== -1) {
        state.productItems[productIndex] = {
          ...state.productItems[productIndex],
          ...product,
        };
      }

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
