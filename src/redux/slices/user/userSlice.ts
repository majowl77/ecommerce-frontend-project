import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UsersinitialState } from '../../../types/users/usersType'

const initialState: UsersinitialState = {
  users: [],
  isLogedIn: false,
  isLogedOut: false,
  error: null,
  isLoading: true,
  loggedUser: null,
  userRole: null,
  isEditForm: false,
  popUp: false
}
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
      state.isLoading = false
    },
    removeUser: (state, action: { payload: { userID: number } }) => {
      const filteredItems = state.users.filter((user) => user.id !== action.payload.userID)
      state.users = filteredItems
    },
    isLogedIn: (state, action: { payload: { foundUser: User } }) => {
      state.isLogedIn = true
      state.isLogedOut = false
      state.loggedUser = action.payload.foundUser
      state.userRole = action.payload.foundUser.role
    },
    isLogedOut: (state) => {
      state.isLogedOut = true
      state.isLogedIn = false
      state.userRole = null
    },
    openEditProfileForm: (state, action: PayloadAction<number>) => {
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
  }
})

export default usersSlice.reducer
export const usersSliceActions = usersSlice.actions
