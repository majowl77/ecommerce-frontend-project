import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slices/products/adminSlice'
import prodcutsReducer from './slices/products/productsSlice'

export const store = configureStore({
  reducer: {
    adminR: adminReducer,
    productsR: prodcutsReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
