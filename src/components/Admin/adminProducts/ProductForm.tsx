import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

import { useDispatch, useSelector } from 'react-redux'
import { adminSliceAction } from '../../../redux/slices/admin/adminSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Product } from '../../../types/type'
import { productsActions } from '../../../redux/slices/products/productsSlice'

const initialProductState: Product = {
  id: 0,
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
  const productItems = useSelector((state: RootState) => state.adminR.productItems)
  const isEditForm = useSelector((state: RootState) => state.adminR.isEditForm)
  const editedProductId = useSelector((state: RootState) => state.adminR.productID)
  const popup = useSelector((state: RootState) => state.adminR.popUp)
  const newProduct = useSelector((state: RootState) => state.adminR.newProduct)

  useEffect(() => {
    if (isEditForm && editedProductId) {
      const productData = productItems.find((product) => product.id === editedProductId)
      if (productData) {
        setProduct(productData)
      }
    }
  }, [isEditForm, editedProductId])

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
  function handleClosePopUp() {
    dispatch(adminSliceAction.setPopUp(false))
    dispatch(adminSliceAction.closeEditForm())
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isEditForm) {
      dispatch(adminSliceAction.editProduct({ editedProductId, product }))
    } else {
      console.log('New product data:', product)
      product.id = +new Date()
      console.log('product:', product)
      dispatch(adminSliceAction.addProduct({ product }))
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
      <Box width="60%">
        <div className="tableProduct">
          <form onSubmit={handleSubmit} className="formProduct">
            <div>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                name="name"
                value={product.name}
                onChange={handleChange}
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
                required
              />
            </div>
            <div>
              <TextField
                id="image"
                label="Image URL"
                variant="outlined"
                name="image"
                value={product.image}
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
                value={product.price}
                onChange={handleChange}
                fullWidth
                sx={{ padding: '8px', marginTop: '8px' }}
              />
            </div>
            <Button
              type="submit"
              variant="outlined"
              sx={{ padding: '8px', marginTop: '10px', color: '#889889' }}>
              {isEditForm ? 'Save Changes' : 'Add Product'}
            </Button>
          </form>
        </div>
      </Box>
    </div>
  )
}
