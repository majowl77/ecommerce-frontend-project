import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoriesState, Category } from '../../../types/type'

const initialState: CategoriesState = {
  categoryList: [],
  error: null,
  isLoading: true,
  categoryID: null,
  isEditForm: false,
  popUp: false 
}

const adminCategoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    getCategories: (state, action: PayloadAction<Category[]>) => {
      state.categoryList = action.payload
      state.isLoading = false
    },
    addCategory: (state, action: { payload: { category: Category }}) => {
        state.categoryList = [action.payload.category, ...state.categoryList]
        state.isLoading = false
      },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    removeCategory: (state, action: { payload: { categoryID: number } }) => {
        const filteredItems = state.categoryList.filter((category) => category.id !== action.payload.categoryID)
        state.categoryList = filteredItems
    },
    openEditCategoryForm: (state, action: PayloadAction<number>) => {
      state.categoryID = action.payload
      state.isEditForm = true
    },
    editCategory: (state, action: PayloadAction<{ editedCategoryId: number | null, category: Category }>)=> {
        const { editedCategoryId, category } = action.payload;
        const categoryIndex = state.categoryList.findIndex((c) => c.id === editedCategoryId);
        if (categoryIndex !== -1) {
          state.categoryList[categoryIndex] = {
            ...state.categoryList[categoryIndex],
            ...category,
          };
        }
  
      },
    closeEditForm: (state) => {
      state.isEditForm = false
    },
    setPopUp: (state, action: PayloadAction<Boolean>)=>{
        if (action.payload === true){
          state.popUp = true 
        }else if (action.payload === false){
          state.popUp = false 
        }
      }
  }
})

export default adminCategoriesSlice.reducer
export const adminCategoriesActions = adminCategoriesSlice.actions
