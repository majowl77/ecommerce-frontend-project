import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminSliceAction } from '../../redux/slices/adminSlice'
import { AppDispatch } from '../../redux/store'
import { Product } from '../../types/type'


const initialProductState: Product = {
    id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price:0,
    quantity:0
  }
  
export default function ProductForm() {
    const dispatch = useDispatch<AppDispatch>()
    const [product, setProduct] = useState<Product>(initialProductState)
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
  
      const isList = name === 'categories' || name === 'variants' || name === 'sizes'
      if (isList) {
        setProduct({
          ...product,
          [name]: value.split(',')
        })
        return
      }
  
      setProduct({
        ...product,
        [name]: value
      })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log('New product data:', product)
        product.id = + new Date()
        console.log('product:', product)
    
        dispatch(adminSliceAction.addProduct({ product }))
        setProduct(initialProductState)
      }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            name="image"
            id="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categories">Categories: (use comma , to create multiple)</label>
          <input
            type="text"
            name="categories"
            id="categories"
            value={product.categories.join(',')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="variants">Variants: (use comma , to create multiple)</label>
          <input
            type="text"
            name="variants"
            id="variants"
            value={product.variants.join(',')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sizes">Sizes: (use comma , to create multiple)</label>
          <input
            type="text"
            name="sizes"
            id="sizes"
            value={product.sizes.join(',')}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}
