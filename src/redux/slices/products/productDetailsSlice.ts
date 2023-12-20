import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  async (productId: string) => {
    try {
      const res = await api.get(`/api/products/${productId}`)
      console.log('🚀 ~ file: productDetailsSlice.ts:17 ~ res.data.product:', res.data)
      return res.data
    } catch (error) {
      console.log('🚀 ~ file: userSlice.ts:41 ~ getUsersThunk ~ error:', error)
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
