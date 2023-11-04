import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { adminSliceAction } from '../../../redux/slices/admin/adminSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Category, Product } from '../../../types/navBar/navBar'
import { adminCategoriesActions } from '../../../redux/slices/admin/adminCategorySlice'

const initialCategoryState: Category = {
  id: 0,
  name: ''
}

export default function CategoriesForm() {
  const dispatch = useDispatch<AppDispatch>()
  const [category, setCategory] = useState<Category>(initialCategoryState)
  const categoryList = useSelector((state: RootState) => state.categoriesR.categoryList)
  const isEditForm = useSelector((state: RootState) => state.categoriesR.isEditForm)
  const editedCategoryId = useSelector((state: RootState) => state.categoriesR.categoryID)
  const popUp = useSelector((state: RootState) => state.categoriesR.popUp)

  useEffect(() => {
    if (isEditForm && editedCategoryId) {
      const categoryData = categoryList.find((category) => category.id === editedCategoryId)
      if (categoryData) {
        setCategory(categoryData)
      }
    }
  }, [isEditForm, editedCategoryId])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCategory({
      ...category,
      [name]: value
    })
  }
  function handleClosePopUp() {
    dispatch(adminCategoriesActions.setPopUp(false))
    dispatch(adminCategoriesActions.closeEditForm())
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isEditForm) {
      dispatch(adminCategoriesActions.editCategory({ editedCategoryId, category }))
    } else {
      category.id = +new Date()
      dispatch(adminCategoriesActions.addCategory({ category }))
    }

    setCategory(initialCategoryState)
    dispatch(adminCategoriesActions.closeEditForm())
    dispatch(adminCategoriesActions.setPopUp(false))
  }
  return (
    <div className="popUp">
      <div className="popUpCloseButton">
        <Button type="submit" variant="text" onClick={handleClosePopUp}>
          <CloseIcon />
        </Button>
      </div>
      <Box width="50%">
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              value={category.name}
              onChange={handleChange}
              fullWidth
              sx={{ padding: '8px', marginTop: '10px' }}
              required
            />
          </div>
          <Button
            type="submit"
            variant="outlined"
            sx={{ padding: '8px', marginTop: '10px', color: '#889889' }}>
            {isEditForm ? 'Save Changes' : 'Add Category'}
          </Button>
        </form>
      </Box>
    </div>
  )
}
