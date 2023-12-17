import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
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

function App() {
  const { userRole } = useSelector((state: RootState) => state.usersR)
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== '/admin' ? <NavBar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        {userRole === 'ADMIN' && <Route path="/admin" element={<Admin />} />}
        <Route path="/products/product-detail/:productId" element={<ProductDetails />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ height: '50px' }}
      />
      {location.pathname !== '/' ? <Footer /> : null}
    </div>
  )
}

export default App
