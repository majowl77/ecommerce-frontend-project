export type Product = {
  id: number
  name: string
  subName?: string
  description: string
  quantity: number
  image: string
  price: number
  categories: number[]
  variants: string[]
  sizes: string[]
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
}
export type ProductsInitialState = {
  productList: Product[]
  error: null | string
  isLoading: boolean
}
export type ProductInitialState = {
  productList: Product[]
  error: null | string
  isLoading: boolean
  product: Product | null
}
