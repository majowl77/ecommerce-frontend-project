import axios, { AxiosError } from 'axios'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/joy/LinearProgress'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import {
  adminCategoriesActions,
  deleteCategoryThunk,
  getAllCategoriesThunk,
  getSingleCategoryThunk
} from '../../../redux/slices/admin/adminCategorySlice'
import { Category } from '../../../types/categories/categoriesType'
import CategoriesForm from './CategoriesFrom'
import { toast } from 'react-toastify'

export default function AdminCategories() {
  const dispatch = useDispatch<AppDispatch>()
  const categoryList = useSelector((state: RootState) => state.categoriesR.categoryList)
  const category = useSelector((state: RootState) => state.categoriesR)
  const isLoading = useSelector((state: RootState) => state.categoriesR.isLoading)
  const popUp = useSelector((state: RootState) => state.categoriesR.popUp)
  const isEditForm = useSelector((state: RootState) => state.categoriesR.isEditForm)

  useEffect(() => {
    const handleGetCategories = async () => {
      dispatch(getAllCategoriesThunk())
    }
    handleGetCategories()
  }, [])

  //deleting a category
  async function handleDelete(categoryID: Category['_id']) {
    console.log(categoryID)
    if (categoryID != null) {
      try {
        const res = await dispatch(deleteCategoryThunk(categoryID))
        toast.success('Category deleted successfully !')
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error('somthing went wrong' + error)
          return
        }
        toast.error("Can't delete the category!." + error)
      }
    }
  }
  //open Edit category form
  function onEdit(categoryID: string) {
    console.log('🚀 ~ file: AdminCategories.tsx:62 ~ onEdit ~ categoryID:', categoryID)
    dispatch(adminCategoriesActions.openEditCategoryForm(categoryID))
    dispatch(adminCategoriesActions.setPopUp(true))
    function fetchSingleCategoryData() {
      if (typeof categoryID === 'string') {
        dispatch(getSingleCategoryThunk(categoryID))
      }
    }
    fetchSingleCategoryData()
  }

  return (
    <div>
      {isLoading === true && <LinearProgress color="success" value={40} variant="solid" />}

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
        {categoryList.length === 0 && category.isLoading === false ? (
          <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">No Categories is existed!</Alert>
            </Stack>
          </div>
        ) : (
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
                <TableRow key={category._id}>
                  <TableCell>{category._id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton className="adminButton" onClick={() => handleDelete(category._id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className="adminButton" onClick={() => onEdit(category._id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
