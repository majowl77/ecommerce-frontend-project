import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import api from '../../../api'
import { CategoriesState, Category } from '../../../types/categories/categoriesType'

const initialState: CategoriesState = {
  categoryList: [],
  error: null,
  isLoading: true,
  categoryID: '',
  isEditForm: false,
  popUp: false,
  category: null
}
// --Admin Category Management CRUD operations--
export const getAllCategoriesThunk = createAsyncThunk(
  'categories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/categories')
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const getSingleCategoryThunk = createAsyncThunk(
  'users/getSingleCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/categories/${categoryId}`)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const deleteCategoryThunk = createAsyncThunk(
  'admin/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/categories/${categoryId}`)
      return categoryId
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const createAdminCategoryThunk = createAsyncThunk(
  'admin/createCategory',
  async (categoryData: Omit<Category, '_id'>, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/categories', categoryData)
      return res.data.category
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const updateAdminCategoryThunk = createAsyncThunk(
  'admin/updateCategory',
  async (
    {
      categoryData,
      editedCategoryId
    }: { categoryData: Omit<Category, '_id'>; editedCategoryId: Category['_id'] },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/api/categories/${editedCategoryId}`, categoryData)
      return res.data.updatedCategory
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

const adminCategoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    getCategories: (state, action: PayloadAction<Category[]>) => {
      state.categoryList = action.payload
      state.isLoading = false
    },
    addCategory: (state, action: { payload: { category: Category } }) => {
      state.categoryList = [action.payload.category, ...state.categoryList]
      state.isLoading = false
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    removeCategory: (state, action: { payload: { categoryID: string } }) => {
      const filteredItems = state.categoryList.filter(
        (category) => category._id !== action.payload.categoryID
      )
      state.categoryList = filteredItems
    },
    openEditCategoryForm: (state, action: PayloadAction<string>) => {
      state.categoryID = action.payload
      state.isEditForm = true
    },
    editCategory: (
      state,
      action: PayloadAction<{ editedCategoryId: string | null; category: Category }>
    ) => {
      const { editedCategoryId, category } = action.payload
      const categoryIndex = state.categoryList.findIndex((c) => c._id === editedCategoryId)
      if (categoryIndex !== -1) {
        state.categoryList[categoryIndex] = {
          ...state.categoryList[categoryIndex],
          ...category
        }
      }
    },
    closeEditForm: (state) => {
      state.isEditForm = false
    },
    setPopUp: (state, action: PayloadAction<Boolean>) => {
      if (action.payload === true) {
        state.popUp = true
      } else if (action.payload === false) {
        state.popUp = false
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllCategoriesThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
      state.categoryList = action.payload
      state.isLoading = false
      return state
    })
    builder.addCase(deleteCategoryThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteCategoryThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      const categoryId = action.payload
      const updatedProducts = state.categoryList.filter((category) => category._id !== categoryId)
      state.categoryList = updatedProducts
      state.isLoading = false

      return state
    })
    builder.addCase(createAdminCategoryThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createAdminCategoryThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(createAdminCategoryThunk.fulfilled, (state, action) => {
      state.categoryList = [...state.categoryList, action.payload]
      state.isLoading = false
      return state
    })
    builder.addCase(updateAdminCategoryThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateAdminCategoryThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(updateAdminCategoryThunk.fulfilled, (state, action) => {
      const updatedCategory = action.payload
      const updatedCategories = state.categoryList.map((category) => {
        if (category._id === updatedCategory._id) {
          return updatedCategory
        }
        return category
      })
      state.categoryList = updatedCategories
      state.isLoading = false
      return state
    })
    builder.addCase(getSingleCategoryThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getSingleCategoryThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getSingleCategoryThunk.fulfilled, (state, action) => {
      state.category = action.payload
      state.isLoading = false
    })
  }
})

export default adminCategoriesSlice.reducer
export const adminCategoriesActions = adminCategoriesSlice.actions
