import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import api from '../../../api'
import { User, UsersinitialState } from '../../../types/users/usersType'

const initialState: UsersinitialState = {
  users: [],
  isLogedIn: false,
  isLogedOut: false,
  error: null,
  isLoading: false,
  loggedUser: null,
  userRole: null,
  isEditForm: false,
  popUp: false
}

export const loginThunk = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/login', credentials)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data.msg)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    getAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addOneUser: (state, action: { payload: { data: User } }) => {
      state.users = [action.payload.data, ...state.users]
      console.log('new user added ', state.users)
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    // removeUser: (state, action: { payload: { userID: number } }) => {
    //   const filteredItems = state.users.filter((user) => user.id !== action.payload.userID)
    //   state.users = filteredItems
    // },
    // isLogedIn: (state, action: { payload: { foundUser: User } }) => {
    //   state.isLogedIn = true
    //   state.isLogedOut = false
    //   state.loggedUser = action.payload.foundUser
    //   state.userRole = action.payload.foundUser.role
    // },
    isLogedOut: (state) => {
      state.isLogedOut = true
      state.isLogedIn = false
      state.userRole = null
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
    builder.addCase(loginThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      console.log('🚀 ~ file: userSlice.ts:89 ~ builder.addCase ~ errorMsg:', errorMsg)
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
      console.log('🚀 ~ file: userSlice.ts:100 ~ builder.addCase ~ loggedUser:', state.loggedUser)
      state.isLogedIn = true
      state.isLoading = false
      return state
    })
  }
})

export default usersSlice.reducer
export const usersSliceActions = usersSlice.actions
