import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users, UsersinitialState } from "../../../types/type";


const initialState :UsersinitialState ={
    users : [],
    isLogedIn: false ,
    isLogedOut: false,
    error: null,
    isLoading: true,
    loggedUser : null,
    userRole: null 
}
const usersSlice = createSlice({
    name: 'users',
    initialState : initialState,
    reducers:{
        getAllUsers: (state, action: PayloadAction<Users[]>)=> {
            state.users = action.payload
        },
        addOneUser : (state, action: {payload:{data : Users }})=>{
            state.users = [action.payload.data, ...state.users]
            console.log("new user added ", state.users)
        },
        getError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
         },
        removeUser: (state, action: { payload: { userID: number } }) => {
            const filteredItems = state.users.filter((user) => user.id !== action.payload.userID)
            state.users = filteredItems
        }, 
        isLogedIn : (state, action: {payload:{foundUser : Users }})=> {
            state.isLogedIn = true 
            state.isLogedOut = false
            state.loggedUser = action.payload.foundUser 
            state.userRole = action.payload.foundUser.role
        },
        isLogedOut: (state )=>{
            state.isLogedOut = true
            state.isLogedIn = false 
        }
    }
})

export default usersSlice.reducer
export const usersSliceActions = usersSlice.actions;
