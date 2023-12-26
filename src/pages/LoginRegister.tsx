import Login from '../components/login/Login'
import Register from '../components/register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'

export default function LoginRegister() {
  const dispatch = useDispatch<AppDispatch>()
  const isSignUp = useSelector((state: RootState) => state.loginRegisterR.signUpPage)
  const isLogin = useSelector((state: RootState) => state.loginRegisterR.loginPage)
  dispatch(navBarActions.navBarNotInHomePage())

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
