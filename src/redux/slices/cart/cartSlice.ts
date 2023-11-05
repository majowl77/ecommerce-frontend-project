import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartInitialState } from "../../../types/cart/cartType"
import { Product} from '../../../types/products/productsTypes'

const initialState:CartInitialState ={
    cartProducts: [],
    isEmpty: true ,
    itemAtCartCounter: 0,
    quantity: 0

}

const cartSlice = createSlice({
    name : 'cart',
    initialState :initialState,
    reducers:{
        addCartProduct:(state , action: PayloadAction<Product>)=> {
            const foundProduct = state.cartProducts.find((item) => item.id === action.payload.id)
            if (foundProduct ){
                foundProduct.quantity= foundProduct.quantity +1 
                console.log("already in cart ", foundProduct.quantity)
            }else {
                state.cartProducts.push(action.payload)
            }
        },
        removeProduct : (state, action: PayloadAction<number>)=>{
             state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload);

        },
        increaseQuantity: (state, action: PayloadAction<number>)=>{
            const itemToIncrease = state.cartProducts.find((item) => item.id === action.payload);
            if (itemToIncrease) {
               itemToIncrease.quantity += 1;
             }
        },
        decreaseQuantity: (state, action: PayloadAction<number>)=>{
            const itemToIncrease = state.cartProducts.find((item) => item.id === action.payload);
            if (itemToIncrease) {
               itemToIncrease.quantity -= 1;
             }
        }
    }
})

export default cartSlice.reducer
export const cartSliceAction = cartSlice.actions