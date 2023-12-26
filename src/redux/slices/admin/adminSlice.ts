import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import api from '../../../api'
import { AdminState } from '../../../types/admin/adminType'
import { Order } from '../../../types/orders/orderType'
import { Product } from '../../../types/products/productsTypes'

const initialState: AdminState = {
  productItems: [],
  error: null,
  isLoading: true,
  orderList: [],
  productID: '',
  isEditForm: false,
  popUp: false,
  isProductAdded: false,
  newProduct: null,
  adminMangement: false,
  adminAnaylitcs: true
}

// --Admin Products Management CRUD operations--
export const getAdminProductsThunk = createAsyncThunk(
  'admin/products',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/products/admin')
      return res.data.products
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const deleteProductThunk = createAsyncThunk(
  'admin/deleteProduct',
  async (productId: string) => {
    try {
      await api.delete(`/api/products/deleteProduct/${productId}`)
      return productId
    } catch (error) {
      console.log('🚀 ~ file: userSlice.ts:51 ~ deleteUsersThunk ~ error:', error)
    }
  }
)

export const createAdminProductsThunk = createAsyncThunk(
  'admin/createProduct',
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/products', productData)
      console.log('🚀 ~ file: productsSlice.ts:15 ~ createAdminProductsThunk ~ res:', res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const updateAdminProductsThunk = createAsyncThunk(
  'admin/updateProduct',
  async (
    { productData, editedProductId }: { productData: FormData; editedProductId: Product['_id'] },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/api/products/${editedProductId}`, productData)
      console.log('🚀 ~ file: productsSlice.ts:15 ~ createAdminProductsThunk ~ res:', res.data)
      return res.data.newProduct
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

// --Admin Orders Management CRUD operations--
export const getAllOrdersThunk = createAsyncThunk(
  'admin/orders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/orders')
      console.log('🚀 ~ file: adminSlice.ts:81 getAllOrdersThunk ~ res:', res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const deleteOrderThunk = createAsyncThunk(
  'admin/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/orders/${orderId}`)
      return orderId
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPopUp: (state, action: PayloadAction<Boolean>) => {
      if (action.payload === true) {
        state.popUp = true
      } else if (action.payload === false) {
        state.popUp = false
      }
    },
    openEditProductForm: (state, action: PayloadAction<string>) => {
      state.productID = action.payload
      state.isEditForm = true
    },
    closeEditForm: (state) => {
      state.isEditForm = false
    },
    editProduct: (
      state,
      action: PayloadAction<{ editedProductId: string | null; product: Product }>
    ) => {
      const { editedProductId, product } = action.payload
      const productIndex = state.productItems.findIndex((p) => p._id === editedProductId)
      if (productIndex !== -1) {
        state.productItems[productIndex] = {
          ...state.productItems[productIndex],
          ...product
        }
      }
    },
    getOrderData: (state, action: PayloadAction<Order[]>) => {
      state.orderList = action.payload
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    adminPageHandel: (state, action: PayloadAction<string>) => {
      if (action.payload === 'mangement') {
        state.adminMangement = true
        state.adminAnaylitcs = false
      } else {
        state.adminMangement = false
        state.adminAnaylitcs = true
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminProductsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAdminProductsThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getAdminProductsThunk.fulfilled, (state, action) => {
      state.productItems = action.payload
      state.isLoading = false
      return state
    })
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      const productId = action.payload
      const updatedProducts = state.productItems.filter((product) => product._id !== productId)
      state.productItems = updatedProducts
      return state
    })
    builder.addCase(createAdminProductsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createAdminProductsThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(createAdminProductsThunk.fulfilled, (state, action) => {
      state.productItems = [...state.productItems, action.payload]
      state.isLoading = false
      return state
    })
    builder.addCase(updateAdminProductsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateAdminProductsThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(updateAdminProductsThunk.fulfilled, (state, action) => {
      const updatedProduct = action.payload
      const updatedProducts = state.productItems.map((product) => {
        if (product._id === updatedProduct._id) {
          return updatedProduct
        }
        return product
      })
      state.productItems = updatedProducts
      state.isLoading = false
      return state
    })
    builder.addCase(getAllOrdersThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrdersThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getAllOrdersThunk.fulfilled, (state, action) => {
      state.orderList = action.payload
      state.isLoading = false
      return state
    })
    builder.addCase(deleteOrderThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteOrderThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      const orderId = action.payload
      const updatedProducts = state.orderList.filter((order) => order._id !== orderId)
      state.orderList = updatedProducts
      state.isLoading = false

      return state
    })
  }
})

export default adminSlice.reducer
export const adminSliceAction = adminSlice.actions
