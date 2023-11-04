import { createSlice } from "@reduxjs/toolkit";
import { LoginRegisterInitialState } from "../../../types/loginRegister/loginRegister";

const initialState:LoginRegisterInitialState = {
    loginPage: true,
    signUpPage: false,
}
const logInRegisterSlice = createSlice({
    name: "loginAndRegister",
    initialState: initialState,
    reducers: {
        setLoginPage: (state) => {
            state.loginPage = true 
            state.signUpPage = false 
        },
        setSignUpPage: (state) => {
            state.loginPage = false 
            state.signUpPage = true 
        },
    }
})
export default logInRegisterSlice.reducer
export const logInRegisterActions = logInRegisterSlice.actions