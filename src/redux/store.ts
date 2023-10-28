import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slices/admin/adminSlice'
import prodcutsReducer from './slices/products/productsSlice'
import productDetailsReducer from './slices/products/productDetailsSlice'
import cartReducer from './slices/cart/cartSlice'
import categoriesReducer from './slices/admin/adminCategorySlice'
import usersReducer from './slices/user/userSlice'
export const store = configureStore({
  reducer: {
    adminR: adminReducer,
    productsR: prodcutsReducer,
    productDetails: productDetailsReducer ,
    cartReducer: cartReducer,
    categoriesR : categoriesReducer,
    usersR : usersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
