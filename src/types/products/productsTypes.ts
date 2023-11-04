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