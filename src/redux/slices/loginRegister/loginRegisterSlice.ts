import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginRegisterInitialState } from '../../../types/loginRegister/loginRegister'
import api from '../../../api'
import { AxiosError } from 'axios'

const initialState: LoginRegisterInitialState = {
  loginPage: true,
  signUpPage: false,
  isLoading: false,
  error: null,
  message: null
}

export const activateUser = createAsyncThunk(
  'Activation/users',
  async (activationToken: string | undefined, { rejectWithValue }) => {
    console.log('🚀 ~ in thunk activationToken:', activationToken)
    try {
      const res = await api.get(`/api/auth/activateUser/${activationToken}`)
      //   console.log('🚀 ~ res:', res.data)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

const logInRegisterSlice = createSlice({
  name: 'loginAndRegister',
  initialState: initialState,
  reducers: {
    setLoginPage: (state) => {
      state.loginPage = true
      state.signUpPage = false
    },
    setSignUpPage: (state) => {
      state.loginPage = false
      state.signUpPage = true
    }
  },
  extraReducers: (builder) => {
    // ---Activate user handling---
    builder.addCase(activateUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(activateUser.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      } else {
        state.error = 'somthing went wrong :('
      }
      state.isLoading = false
      return state
    })
    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.message = action.payload.message
      console.log('🚀 ~ builder.addCase ~ action.payload.:', action.payload)
      state.isLoading = false
      return state
    })
  }
})
export default logInRegisterSlice.reducer
export const logInRegisterActions = logInRegisterSlice.actions
