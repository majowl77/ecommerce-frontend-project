export type Category = {
    id: number
    name: string
  }
  
  export type CategoriesState = {
    categoryList: Category[]
    error: null | string 
    isLoading: boolean
    categoryID: null | number
    isEditForm: boolean
    popUp: boolean 
  }
  