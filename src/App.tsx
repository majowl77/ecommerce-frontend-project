import { ProductsManager } from './components/ProductsManager'
import './App.css'
import Home from './components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './components/Products/Products'
import Login from './components/Admin/Login'
import Cart from './components/Products/Cart'
import ProductDetails from './components/Products/ProductDetails'
import Admin from './components/Admin/Admin'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App
