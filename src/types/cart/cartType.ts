import { Product } from "../products/productsTypes"

export type CartInitialState ={
    cartProducts: Product[],
    isEmpty: boolean ,
    itemAtCartCounter: number,
    quantity: 0
  }
  