import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users, UsersinitialState } from "../../../types/type";


const initialState :UsersinitialState ={
    users : [],
    isLogedin: false ,
    error: null,
    isLoading: true
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
        },
        getError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
         },
         removeUser: (state, action: { payload: { userID: number } }) => {
            const filteredItems = state.users.filter((user) => user.id !== action.payload.userID)
            state.users = filteredItems
        }
    }
})

export default usersSlice.reducer
export const usersSliceActions = usersSlice.actions;
