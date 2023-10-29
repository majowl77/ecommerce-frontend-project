import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Cart from './components/products/Cart'
import ProductDetails from './components/products/ProductDetails'
import Admin from './pages/Admin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import LoginRegister from './pages/LoginRegister'

function App() {
  const { isLogedIn } = useSelector((state: RootState) => state.usersR)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Login" element={<LoginRegister />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
      <ToastContainer theme="colored" position="top-right" />
    </div>
  )
}

export default App
