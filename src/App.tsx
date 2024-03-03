import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './components/cart/Cart'
import ProductDetails from './components/products/ProductDetails'
import Admin from './pages/Admin'
import { RootState } from './redux/store'
import LoginRegister from './pages/LoginRegister'
import Footer from './components/home/Footer'
import NavBar from './components/home/NavBar'
import Profile from './pages/Profile'
import { isAdmin } from './utils/IsAdmin'
import NotFound from './pages/NotFound'
import ResetPassword from './components/forgotPassword/ResetPassword'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import Activation from './pages/Activation'

function App() {
  const { decodedUser } = useSelector((state: RootState) => state.usersR)
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== '/admin' ? <NavBar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={decodedUser ? <Profile /> : <NotFound />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product-detail/:productId" element={<ProductDetails />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:forgotPasswordCode" element={<ResetPassword />} />
        <Route path="api/auth/activateUser/:activationToken" element={<Activation />} />
        <Route
          path="/admin"
          element={decodedUser && isAdmin() ? <Admin /> : <Navigate to="/*" />}
        />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {location.pathname !== '/' ? <Footer /> : null}
    </div>
  )
}

export default App
