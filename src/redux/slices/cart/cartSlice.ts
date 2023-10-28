import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../../types/type"

type InitialState ={
    cartCounter: number ,
    cartProducts: Product[],
    isEmpty: boolean ,
    itemAtCartCounter: number,
}
const initialState:InitialState ={
    cartCounter: 0 ,
    cartProducts: [],
    isEmpty: true ,
    itemAtCartCounter: 0,

}

const cartSlice = createSlice({
    name : 'cart',
    initialState :initialState,
    reducers:{
        addCartProduct:(state , action: PayloadAction<Product>)=> {
            state.cartProducts.push(action.payload)
        },
        addCartCounter: (state)=>{
                state.cartCounter = state.cartCounter + 1 ; 
          },
        removeProduct : (state, action: PayloadAction<number>)=>{
            // const itemToIncrease = state.cartProducts.find((item) => item.id === action.payload);
            // if (itemToIncrease) {
            //   const quantity =  itemToIncrease.quantity ;
            //    state.cartCounter = state.cartCounter - quantity ;
            //  }
             state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload);
             state.cartCounter = state.cartCounter - 1 ;
        },
        increaseQuantity: (state, action: PayloadAction<number>)=>{
            const itemToIncrease = state.cartProducts.find((item) => item.id === action.payload);
            if (itemToIncrease) {
               itemToIncrease.quantity += 1;
               state.cartCounter = state.cartCounter + 1 ;
             }
        },
        decreaseQuantity: (state, action: PayloadAction<number>)=>{
            const itemToIncrease = state.cartProducts.find((item) => item.id === action.payload);
            if (itemToIncrease) {
               itemToIncrease.quantity -= 1;
               state.cartCounter = state.cartCounter - 1 ;
             }
        }
    }
})

export default cartSlice.reducer
export const cartSliceAction = cartSlice.actions