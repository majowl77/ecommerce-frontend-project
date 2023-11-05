import axios from 'axios'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { adminCategoriesActions } from '../../../redux/slices/admin/adminCategorySlice'
import { Category } from '../../../types/categories/categoriesType'
import CategoriesForm from './CategoriesFrom'

export default function AdminCategories() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/categories.json'
  const categoryList = useSelector((state: RootState) => state.categoriesR.categoryList)
  const errorMessage = useSelector((state: RootState) => state.categoriesR.error)
  const isLoading = useSelector((state: RootState) => state.categoriesR.isLoading)
  const popUp = useSelector((state: RootState) => state.categoriesR.popUp)
  const isEditForm = useSelector((state: RootState) => state.categoriesR.isEditForm)

  useEffect(() => {
    function fetchCategoriesData() {
      axios
        .get(url)
        .then((response) => dispatch(adminCategoriesActions.getCategories(response.data)))
        .catch((error) => dispatch(adminCategoriesActions.getError(error.message)))
    }
    fetchCategoriesData()
  }, [])
  // handling the request
  if (isLoading === true) {
    return (
      <Box sx={{ display: 'flex', width: 60, height: 23 }}>
        <CircularProgress />
      </Box>
    )
  }
  // error message handling
  if (errorMessage && categoryList.length === 0) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{errorMessage}</Alert>
      </Stack>
    )
  }
  //removing a category
  function onRemove(category: Category) {
    if (category != null) {
      dispatch(adminCategoriesActions.removeCategory({ categoryID: category.id }))
      console.log(category)
    }
  }
  //open Edit category form
  function onEdit(categoryID: number) {
    dispatch(adminCategoriesActions.openEditCategoryForm(categoryID))
    dispatch(adminCategoriesActions.setPopUp(true))
  }

  return (
    <div>
      <React.Fragment>
        <Typography
          component="div"
          style={{
            display: 'flex',
            alignItems: 'center', // Vertical alignment
            paddingTop: '40px',
            paddingBottom: '10px'
          }}>
          <h1 className="titleAdminCategory">Categories Mangement</h1>
          <h2 className="subTitleAdmin">Total Categories: {categoryList.length}</h2>
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Category ID </TableCell>
              <TableCell> Category Name</TableCell>
              <TableCell> Delete </TableCell>
              <TableCell> Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton className="adminButton" onClick={() => onRemove(category)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton className="adminButton" onClick={() => onEdit(category.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
      <div id="addNewCategory">
        <Button
          variant="text"
          className="adminButton"
          onClick={() => dispatch(adminCategoriesActions.setPopUp(true))}
          style={{ color: '#a4b6a6', fontSize: '18px', borderBlockColor: '#437246' }}>
          Add New Category <AddBoxIcon />
        </Button>
      </div>
      <div>{popUp && <CategoriesForm />}</div>
    </div>
  )
}
