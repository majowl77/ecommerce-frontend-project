import { Product } from '../products/productsTypes'
import { Order } from '../orders/orderType'

export type AdminState = {
  productItems: Product[]
  error: null | string
  isLoading: boolean
  orderList: Order[]
  productID: string
  isEditForm: boolean
  popUp: boolean
  isProductAdded: boolean
  newProduct: Product | null
}
