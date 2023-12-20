import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Input from '@mui/joy/Input'
import FormLabel from '@mui/joy/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import { Paper } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import {
  adminSliceAction,
  createAdminProductsThunk,
  updateAdminProductsThunk
} from '../../../redux/slices/admin/adminSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Product } from '../../../types/products/productsTypes'
import { productsActions } from '../../../redux/slices/products/productsSlice'
import { getSingleProductThunk } from '../../../redux/slices/products/productDetailsSlice'

const initialProductState: Product = {
  _id: '',
  name: '',
  subName: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0,
  quantity: 0
}

export default function ProductForm() {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)
  const [image, setImage] = useState<File | undefined>(undefined)
  const productItems = useSelector((state: RootState) => state.adminR.productItems)
  const isEditForm = useSelector((state: RootState) => state.adminR.isEditForm)
  const editedProductId = useSelector((state: RootState) => state.adminR.productID)
  const updatedProduct = useSelector((state: RootState) => state.productDetails.product)
  const popup = useSelector((state: RootState) => state.adminR.popUp)
  const newProduct = useSelector((state: RootState) => state.adminR.newProduct)

  useEffect(() => {
    if (isEditForm && editedProductId) {
      console.log('🚀 ~ file: ProductForm.tsx:43 ~ useEffect ~ isEditForm:', isEditForm)
      if (updatedProduct) {
        console.log('🚀 ~ file: ProductForm.tsx:49 ~ useEffect ~ updatedProduct:', updatedProduct)
        setProduct(updatedProduct)
      }
    }
  }, [isEditForm, editedProductId, updatedProduct])

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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log('🚀 ~ file: ProductForm.tsx:65 ~ handleFileChange ~ files:', files)
    if (files && files.length > 0) {
      setImage(files[0])
      console.log('🚀 ~ file: ProductForm.tsx:70 ~ handleFileChange ~ setImage:', image)
    } else {
    }
  }

  function handleClosePopUp() {
    dispatch(adminSliceAction.setPopUp(false))
    dispatch(adminSliceAction.closeEditForm())
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // setProduct({ ...product, image: image })
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('quantity', String(product.quantity))
    formData.append('price', String(product.price))
    // Append categories as an array of strings
    product.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category)
    })
    formData.append('variants', JSON.stringify(product.variants))
    formData.append('sizes', JSON.stringify(product.sizes))

    if (image) {
      formData.append('image', image)
    }

    if (isEditForm && updatedProduct) {
      console.log('🌟🌟🌟🌟🌟🌟🌟 updated product', product)
      dispatch(updateAdminProductsThunk({ productData: formData, editedProductId }))
    } else {
      dispatch(createAdminProductsThunk(formData))
    }

    setProduct(initialProductState)
    dispatch(adminSliceAction.closeEditForm())
    dispatch(adminSliceAction.setPopUp(false))
  }
  return (
    <div className="popUp">
      <div className="popUpCloseButton">
        <Button type="submit" variant="text" onClick={handleClosePopUp}>
          <CloseIcon />
        </Button>
      </div>
      <Paper
        elevation={0}
        sx={{ height: '600px', overflow: 'auto', padding: '16px', marginBottom: '8px' }}>
        <div className="tableProduct">
          <form onSubmit={handleSubmit} className="formProduct">
            <div>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                name="name"
                type="text"
                value={product.name}
                onChange={handleChange}
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
                required
              />
            </div>
            <div>
              <TextField
                label="Uploaed Image"
                id="image"
                variant="outlined"
                name="image"
                onChange={handleFileChange}
                type="file"
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"> </InputAdornment>
                }}
              />
            </div>
            <div>
              <TextField
                id="quantity"
                label="quantity"
                multiline
                variant="outlined"
                name="quantity"
                type="text"
                value={product.quantity}
                onChange={handleChange}
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
                required
              />
            </div>
            <div>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4} // Adjust the number of rows as needed
                variant="outlined"
                name="description"
                type="text"
                value={product.description}
                onChange={handleChange}
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
                required
              />
            </div>
            <div>
              <TextField
                id="categories"
                label="Categories"
                variant="outlined"
                name="categories"
                type="text"
                value={product.categories.join(',')}
                onChange={handleChange}
                fullWidth
                helperText="(Use a comma to separate multiple categories)"
                sx={{ padding: '8px', marginTop: '8px' }}
                required
              />
            </div>
            <div>
              <TextField
                id="variants"
                name="variants"
                label="Variants"
                type="text"
                helperText="(use comma , to create multiple)"
                value={product.variants.join(',')}
                onChange={handleChange}
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
              />
            </div>
            <div>
              <TextField
                id="sizes"
                label="Sizes"
                variant="outlined"
                name="sizes"
                type="text"
                value={product.sizes.join(',')}
                onChange={handleChange}
                fullWidth
                helperText="(use comma , to create multiple)"
                sx={{ padding: '8px', marginTop: '8px' }}
              />
            </div>
            <div>
              <TextField
                id="price"
                label="Price"
                variant="outlined"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ padding: '8px', marginTop: '10px', color: '#889889' }}>
              {isEditForm ? 'Save Changes' : 'Add Product'}
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  )
}
