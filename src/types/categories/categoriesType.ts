export type Category = {
  _id: string
  name: string
}

export type CategoriesState = {
  categoryList: Category[]
  error: null | string
  isLoading: boolean
  categoryID: string
  isEditForm: boolean
  popUp: boolean
  category: Category | null
}
