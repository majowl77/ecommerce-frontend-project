export type ProductInitialState = {
  productList: Product[]
  error: null | string
  isLoading: boolean
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
}
export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
}
