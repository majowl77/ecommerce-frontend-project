import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slices/adminSlice'
import prodcutsReducer from './slices/productsSlice'
import productDetailsReducer from './slices/productDetailsSlice'
import cartReducer from './slices/cartSlice'
export const store = configureStore({
  reducer: {
    adminR: adminReducer,
    productsR: prodcutsReducer,
    productDetails: productDetailsReducer ,
    cartReducer: cartReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
