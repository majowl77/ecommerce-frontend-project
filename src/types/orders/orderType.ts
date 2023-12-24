export type Order = {
  _id: string
  products: {
    quantity: number
    _id: string
  }
  userId: string
  purchasedAt: string
  orderStatus: OrderStatus
}

export const ORDER_STATUS = {
  accepted: 'accepted',
  pending: 'pending',
  delivered: 'delivered',
  shipped: 'shipped'
} as const

export type OrderStatus = keyof typeof ORDER_STATUS
