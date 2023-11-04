import { createSlice } from "@reduxjs/toolkit";
import { NavBarInitialState } from "../../../types/navBar/navBar";



const initialState:NavBarInitialState ={
    isNavBarInHome : true
}
const navBarSlice = createSlice({
    name: 'navBar',
    initialState : initialState ,
    reducers: {
        navBarInHomePage: (state)=>{
            state.isNavBarInHome = true
        },
        navBarNotInHomePage: (state)=>{
            state.isNavBarInHome = false 
        }
    }
})

export default navBarSlice.reducer
export const navBarActions = navBarSlice.actions