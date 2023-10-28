import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { usersSliceActions } from '../../../redux/slices/user/userSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Users } from '../../../types/type'

export default function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/users.json'
  const usersList = useSelector((state: RootState) => state.usersR.users)

  //fetching the data form JSON file
  useEffect(() => {
    function fetchProductsData() {
      axios
        .get(url)
        .then((response) => dispatch(usersSliceActions.getAllUsers(response.data)))
        .catch((error) => dispatch(usersSliceActions.getError(error.message)))
    }
    fetchProductsData()
  }, [])

  //removing a User
  function onRemove(user: Users) {
    if (user != null) {
      dispatch(usersSliceActions.removeUser({ userID: user.id }))
      console.log(user)
    }
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
          <h1 className="titleAdminProducts">User Mangement</h1>
          <h2 className="subTitleAdmin">Total Users: {usersList.length}</h2>
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User ID </TableCell>
              <TableCell> First Name</TableCell>
              <TableCell> Last Name</TableCell>
              <TableCell> Email</TableCell>
              <TableCell> Role</TableCell>
              <TableCell> Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton className="adminButton" onClick={() => onRemove(user)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>
  )
}
