import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Product, ProductsInitialState } from '../../types/type'

const initialState: ProductsInitialState = {
  productList: [],
  error: null,
  isLoading: true,
}
const productSlice = createSlice({
  name: 'productsList',
  initialState: initialState,
  reducers: {
    getProductsData: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload
      state.isLoading = false
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    getSelectedSort: (state , action:PayloadAction<string>)=>{
            if (action.payload === "highttolow"){
                state.productList.sort((product1, product2) => {
                    const productOne = product1.price;
                    const productTwo = product2.price;
                    if (productOne > productTwo) {
                      return -1;
                    }
                    if (productOne < productTwo) {
                      return 1;
                    }
                    return 0;
                  });
            }else if (action.payload === "lowtohigh"){
                state.productList.sort((Company1, Company2) => {
                  const productOne = Company1.price;
                  const productTwo = Company2.price;
                  if (productOne < productTwo) {
                    return -1;
                  }
                  if (productOne > productTwo) {
                    return 1;
                  }
                    return 0;
                  });
            }
  }
}
})

export default productSlice.reducer
export const productsActions = productSlice.actions
