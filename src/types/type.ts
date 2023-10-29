export type ProductsInitialState = {
  productList: Product[]
  error: null | string
  isLoading: boolean
  oldProductList: Product[],

}
export type ProductInitialState = {
  error: null | string
  isLoading: boolean
  product: Product | null
}
export type UsersinitialState = {
  users: Users[]
  isLogedin: boolean
  error: null | string
  isLoading: boolean

}

export type Users = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
  quantity: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
}

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}
export type AdminState ={
  productItems: Product[],
  error: null | string,
  isLoading: boolean,
  orderList: Order[],
  productID: number | null 
  isEditForm:boolean
  popUp: boolean ,
  isProductAdded : boolean,
  newProduct: Product | null
}
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