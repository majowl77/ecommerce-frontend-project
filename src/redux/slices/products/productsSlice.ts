import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Product, ProductInitialState } from '../../../types/type'

const initialState: ProductInitialState = {
  productList: [],
  error: null,
  isLoading: true
}
const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    getProductsData: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload
      state.isLoading = false
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    }
    //     getSelectedSort: (state , action:PayloadAction<string>)=>{
    //         if (action.payload === "Ascending"){
    //             state.productList.sort((Company1, Company2) => {
    //                 const CompanyOne = Company1.login.toUpperCase();
    //                 const Companytwo = Company2.login.toUpperCase();
    //                 if (CompanyOne < Companytwo) {
    //                   return -1;
    //                 }
    //                 if (CompanyOne > Companytwo) {
    //                   return 1;
    //                 }

    //                 return 0;
    //               });
    //         }else if (action.payload === "Descending"){
    //             state.productList.sort((Company1, Company2) => {
    //                 const CompanyOne = Company1.login.toUpperCase();
    //                 const Companytwo = Company2.login.toUpperCase();
    //                 if (CompanyOne >Companytwo) {
    //                   return -1;
    //                 }
    //                 if (CompanyOne < Companytwo) {
    //                   return 1;
    //                 }

    //                 return 0;
    //               });
    //         }
  }
})

export default productSlice.reducer
export const productsActions = productSlice.actions
