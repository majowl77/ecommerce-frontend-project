import { Product } from '../products/productsTypes'

export type CartInitialState = {
  cartProducts: { _id: string; product: Product; quantity: number }[]
  isEmpty: boolean
  itemAtCartCounter: number | null
  quantity: 0
  error: null | string
  isLoading: boolean
  totalPrice: number
  cartId: string
  message: null | string
}
