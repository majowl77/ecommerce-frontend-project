import './App.css'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './Pages/Products'
import Login from './Pages/Login'
import Cart from './components/Products/Cart'
import ProductDetails from './components/Products/ProductDetails'
import Admin from './Pages/Admin'

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
