import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users, UsersinitialState } from "../../../types/type";


const initialState :UsersinitialState ={
    users : [],
    isLogedin: false ,
    error: null
}
const usersSlice = createSlice({
    name: 'users',
    initialState : initialState,
    reducers:{
        getAllUsers: (state, action: PayloadAction<Users[]>)=> {
            state.users = action.payload
        },
        addOneUser : (state, action: PayloadAction<Users>)=>{
            state.users.push(action.payload) 
            state.isLogedin = true ;
        }
    }
})

export default usersSlice.reducer
export const usersSliceActions = usersSlice.actions;
