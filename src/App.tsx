import './App.css'
import Home from './pages/Home'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Products from './pages/Products'
import Cart from './components/cart/Cart'
import ProductDetails from './components/products/ProductDetails'
import Admin from './pages/Admin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import LoginRegister from './pages/LoginRegister'
import Footer from './components/home/Footer'
import NavBar from './components/home/NavBar'
import AdminDashboard from './pages/Admin'

function App() {
  const { isLogedIn, userRole } = useSelector((state: RootState) => state.usersR)
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== '/admin' ? <NavBar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/cart" element={<Cart />} />
        {userRole === 'admin' && <Route path="/admin" element={<Admin />} />}
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
