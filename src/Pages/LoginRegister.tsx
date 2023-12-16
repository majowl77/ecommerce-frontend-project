import React, { useEffect, useState } from 'react'
import Login from '../components/login/Login'
import Register from '../components/register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import axios from 'axios'
import { usersSliceActions } from '../redux/slices/user/userSlice'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'

export default function LoginRegister() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/users.json'
  const isSignUp = useSelector((state: RootState) => state.loginRegisterR.signUpPage)
  const isLogin = useSelector((state: RootState) => state.loginRegisterR.loginPage)
  dispatch(navBarActions.navBarNotInHomePage())

  //fetching the data form JSON file
  useEffect(() => {
    function fetchProductsData() {
      axios
        .get(url)
        .then((response) => dispatch(usersSliceActions.getAllUsers(response.data)))
        .catch((error) => dispatch(usersSliceActions.getError(error.message)))
    }
    fetchProductsData()
  }, [])

  return (
    <div className="loginPage">
      <div className="formContainer">
        <div className="tabsLoginSignup"></div>
        {isLogin && <Login />}
        {isSignUp && <Register />}
      </div>
    </div>
  )
}
