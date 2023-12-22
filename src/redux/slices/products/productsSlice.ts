import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import api from '../../../api'

import { Product, ProductsInitialState } from '../../../types/products/productsTypes'

const initialState: ProductsInitialState = {
  productList: [],
  error: null,
  isLoading: false
}

export const getProductsThunk = createAsyncThunk(
  'products',
  async ({
    sortOption,
    categoryValue,
    searchKeyWord,
    pageNumber
  }: {
    sortOption: string
    categoryValue: string
    searchKeyWord: string
    pageNumber: number
  }) => {
    try {
      const res = await api.get(
        `/api/products?pageNumber=${pageNumber}&category=${categoryValue}&searchText=${searchKeyWord}&sortBy=${sortOption}`
      )
      console.log('🚀 ~ file: productsSlice.ts:15 ~ getProductsThunk ~ res:', res.data)
      return res.data
    } catch (error) {
      console.log('🚀 ~ file: productsSlice.ts:19 ~ getProductThunk ~ error:', error)
    }
  }
)

const productSlice = createSlice({
  name: 'productsList',
  initialState: initialState,
  reducers: {
    // getProductsData: (state, action: PayloadAction<Product[]>) => {
    //   state.productList = action.payload
    //   state.isLoading = false
    // },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    addProduct: (state, action: { payload: { newProduct: Product } }) => {
      state.productList = [action.payload.newProduct, ...state.productList]
    },
    getSelectedSort: (state, action: PayloadAction<string>) => {
      // if (action.payload === 'htl') {
      //   state.productList = [...state.productList]
      //   state.productList.sort((product1, product2) => {
      //     const productOne = product1.price
      //     const productTwo = product2.price
      //     if (productOne > productTwo) {
      //       return -1
      //     }
      //     if (productOne < productTwo) {
      //       return 1
      //     }
      //     return 0
      //   })
      // } else if (action.payload === 'lth') {
      //   state.productList = [...state.productList]
      //   state.productList.sort((Company1, Company2) => {
      //     const productOne = Company1.price
      //     const productTwo = Company2.price
      //     if (productOne < productTwo) {
      //       return -1
      //     }
      //     if (productOne > productTwo) {
      //       return 1
      //     }
      //     return 0
      //   })
      // } else if (action.payload === 'All') {
      //   state.productList = [...state.oldProductList]
      //   console.log('oldProduct', state.oldProductList)
      // }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getProductsThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.productList = action.payload.products
      state.isLoading = false
      return state
    })
  }
})

export default productSlice.reducer
export const productsActions = productSlice.actions
