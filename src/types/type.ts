export type ProductsInitialState = {
  productList: Product[]
  error: null | string
  isLoading: boolean
  oldProductList: Product[],

}
export type ProductInitialState = {
  productList: Product[]
  error: null | string
  isLoading: boolean
  product: Product | null
}
export type UsersinitialState = {
  users: Users[]
  isLogedIn: boolean
  isLogedOut: boolean
  error: null | string
  isLoading: boolean
  loggedUser: null | Users
  userRole: null | 'visitor' | 'admin'
  isEditForm: boolean,
  popUp: boolean 

}

export type Users = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'visitor' | 'admin'
}

export type Product = {
  id: number
  name: string
  subName: string
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

export type CartInitialState ={
  cartProducts: Product[],
  isEmpty: boolean ,
  itemAtCartCounter: number,
  quantity: 0
}

export type SignUpFormValues = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'visitor' | 'admin'
}

export type LogInFormValues = {
  email: string
  password: string
}