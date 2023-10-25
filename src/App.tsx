import { ProductsManager } from './components/ProductsManager'
import './App.css'
import Home from './components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './components/Products/Products'
import Login from './components/Admin/Login'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
