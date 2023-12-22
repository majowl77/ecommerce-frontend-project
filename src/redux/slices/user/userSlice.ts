import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import api from '../../../api'
import { RegisterSchema } from '../../../types/loginRegister/loginRegister'
import { User, UsersinitialState } from '../../../types/users/usersType'
import { getDecodedTokenFromStorage } from '../../../utils/token'

const decodedUser = getDecodedTokenFromStorage()

const initialState: UsersinitialState = {
  users: [],
  isLogedIn: false,
  isLogedOut: false,
  error: null,
  isLoading: false,
  decodedUser,
  loggedUser: null,
  userRole: null,
  isEditForm: false,
  popUp: false,
  message: null
}

export const loginThunk = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/login', credentials)
      console.log('🚀 ~ file: userSlice.ts:28 ~ res.data:', res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const registerThunk = createAsyncThunk(
  'user/register',
  async (userData: RegisterSchema, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/register', userData)
      console.log('🚀 ~ file: userSlice.ts:42 registerThunk ~ res:', res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          '🚀 ~ file: userSlice.ts:48 ~ error.response?.data.msg:',
          error.response?.data.msg
        )
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const getUsersThunk = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/users/admin/getAllUsers')
      return res.data.users
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

export const deleteUsersThunk = createAsyncThunk('users/delete', async (userId: string) => {
  try {
    await api.delete(`/api/users/admin/deleteUser/${userId}`)
    return userId
  } catch (error) {
    console.log('🚀 ~ file: userSlice.ts:51 ~ deleteUsersThunk ~ error:', error)
  }
})

export const grantRoleUserThunk = createAsyncThunk(
  'users/role',
  async ({ role, userId }: { role: string; userId: User['_id'] }, { rejectWithValue }) => {
    try {
      const user = await api.put('/api/users/admin/role', { role, userId })
      return user.data.user
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    isLogedOut: (state) => {
      state.isLogedOut = true
      state.isLogedIn = false
      state.decodedUser = null
      state.loggedUser = null
    },
    openEditProfileForm: (state) => {
      state.isEditForm = true
    },
    setPopUp: (state, action: PayloadAction<Boolean>) => {
      if (action.payload === true) {
        state.popUp = true
      } else if (action.payload === false) {
        state.popUp = false
      }
    },
    closeEditForm: (state) => {
      state.isEditForm = false
    },
    editUserInfo: (state, action: { payload: { userInfo: User } }) => {
      const { userInfo } = action.payload
      state.loggedUser = {
        ...state.loggedUser, // Keep the old user data
        ...userInfo // Update with the new user data
      }
    }
  },
  extraReducers: (builder) => {
    // ---Login handling---
    builder.addCase(loginThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      state.isLogedIn = false

      return state
    })
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loggedUser = action.payload.user
      console.log('🚀 ~ file: userSlice.ts:124 ~ builder.addCase ~ action.payload:', action.payload)
      state.decodedUser = decodedUser
      state.isLogedIn = true
      state.isLoading = false
      return state
    })
    // ---Register handling---
    builder.addCase(registerThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(registerThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      state.isLogedIn = false

      return state
    })
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      return state
    })
    // --- Handling the retrieval of users information ---
    builder.addCase(getUsersThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getUsersThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload
      state.isLoading = false
    })
    // --- Granting user roles ---
    builder.addCase(grantRoleUserThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(grantRoleUserThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(grantRoleUserThunk.fulfilled, (state, action) => {
      const userId = action.payload._id
      const updatedUsers = state.users.map((user) => {
        if (user._id === userId) {
          return action.payload
        }
        return user
      })
      state.users = updatedUsers
      state.isLoading = false
      return state
    })
    // --- handle deleting the user ---
    builder.addCase(deleteUsersThunk.fulfilled, (state, action) => {
      const userId = action.payload
      const updatedUsers = state.users.filter((user) => user._id !== userId)
      state.users = updatedUsers
      return state
    })
  }
})

export default usersSlice.reducer
export const usersSliceActions = usersSlice.actions
