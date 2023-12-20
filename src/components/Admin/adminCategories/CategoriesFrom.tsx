import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { adminSliceAction } from '../../../redux/slices/admin/adminSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Category } from '../../../types/categories/categoriesType'
import {
  adminCategoriesActions,
  createAdminCategoryThunk,
  updateAdminCategoryThunk
} from '../../../redux/slices/admin/adminCategorySlice'
import { Paper } from '@mui/material'

const initialCategoryState: Category = {
  _id: '',
  name: ''
}

export default function CategoriesForm() {
  const dispatch = useDispatch<AppDispatch>()
  const [category, setCategory] = useState<Category>(initialCategoryState)
  const categoryList = useSelector((state: RootState) => state.categoriesR.categoryList)
  const isEditForm = useSelector((state: RootState) => state.categoriesR.isEditForm)
  const editedCategoryId = useSelector((state: RootState) => state.categoriesR.categoryID)
  const updatedCategory = useSelector((state: RootState) => state.categoriesR.category)
  const popUp = useSelector((state: RootState) => state.categoriesR.popUp)

  useEffect(() => {
    if (isEditForm && editedCategoryId) {
      console.log('🚀 ~ file: CategoriesFrom.tsx:28 ~ useEffect ~ isEditForm:', isEditForm)
      if (updatedCategory) {
        console.log(
          '🚀 ~ file: CategoriesFrom.tsx:34 ~ useEffect ~ updatedCategory:',
          updatedCategory
        )
        setCategory(updatedCategory)
      }
    }
  }, [isEditForm, editedCategoryId, updatedCategory])

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
    if (isEditForm && updatedCategory) {
      console.log('🚀 we are hereeee ~ handleSubmit ~ isEditForm:', isEditForm)
      dispatch(updateAdminCategoryThunk({ categoryData: category, editedCategoryId }))
    } else {
      console.log('ihave got hereeeeee')
      dispatch(createAdminCategoryThunk({ name: category.name }))
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
      <Paper
        elevation={0}
        sx={{
          height: '170px',
          width: '350px',
          overflow: 'auto',
          padding: '16px',
          marginBottom: '8px'
        }}>
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
            variant="contained"
            color="inherit"
            sx={{ padding: '8px', marginTop: '10px', color: '#889889' }}>
            {isEditForm ? 'Save Changes' : 'Add Category'}
          </Button>
        </form>
      </Paper>
    </div>
  )
}
