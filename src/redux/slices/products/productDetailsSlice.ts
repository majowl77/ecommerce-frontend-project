import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import api from '../../../api'
import { Product, ProductInitialState } from '../../../types/products/productsTypes'

const initialState: ProductInitialState = {
  productList: [],
  isLoading: true,
  error: null,
  product: null
}

export const getSingleProductThunk = createAsyncThunk(
  'users/getSingleProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/${productId}`)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

const productDetailsSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    getProductsData: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload
      state.isLoading = false
    },
    getOneProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload
      state.isLoading = false
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    resetProductInfo: (state) => {
      state.isLoading = true
      state.product = initialState.product
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleProductThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getSingleProductThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
      state.product = action.payload

      state.isLoading = false
    })
  }
})
export default productDetailsSlice.reducer
export const productDetailsAtions = productDetailsSlice.actions
