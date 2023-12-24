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
  async (
    {
      sortOption,
      categoryValue,
      searchKeyWord,
      pageNumber
    }: {
      sortOption: string
      categoryValue: string
      searchKeyWord: string
      pageNumber: number
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get(
        `/api/products?pageNumber=${pageNumber}&category=${categoryValue}&searchText=${searchKeyWord}&sortBy=${sortOption}`
      )
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

const productSlice = createSlice({
  name: 'productsList',
  initialState: initialState,
  reducers: {},
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
