import axios from 'axios'
import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'

import { getUsersThunk, usersSliceActions } from '../../../redux/slices/user/userSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { ROLES, User } from '../../../types/users/usersType'

export default function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>()
  const usersList = useSelector((state: RootState) => state.usersR.users)

  //fetching the data form JSON file
  useEffect(() => {
    function fetchUsersData() {
      dispatch(getUsersThunk())
    }
    fetchUsersData()
  }, [])

  //handle role granting
  const handleRoleChange = (
    newValue: {} | null,
    userId: User[] // Assuming user._id is a string; adjust the type accordingly
  ) => {
    if (typeof newValue === 'string') {
      console.log('🚀 ~ file: AdminUsers.tsx:36 ~ handleRoleChange ~ event?.target:', newValue)
    }
  }
  //removing a User
  function onRemove(user: User) {
    if (user != null) {
      // dispatch(usersSliceActions.removeUser({ userID: user.id }))
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
            {usersList.length > 0 && (
              <TableRow>
                <TableCell> ID</TableCell>
                <TableCell> First Name</TableCell>
                <TableCell> Last Name</TableCell>
                <TableCell> Email</TableCell>
                <TableCell> isActive</TableCell>
                <TableCell> Role</TableCell>
                <TableCell> Grant Roles</TableCell>
                <TableCell> Delete User </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {usersList.length > 0 &&
              usersList.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isActive ? 'activated' : 'inactive'}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Select
                      color="neutral"
                      placeholder="Choose one…"
                      size="sm"
                      variant="outlined"
                      onChange={(_, newValue) => handleRoleChange(newValue, user._id)}>
                      {Object.keys(ROLES).map((role) => (
                        <Option key={role} value={role}>
                          {role}
                        </Option>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <IconButton className="adminButton" onClick={() => onRemove(user)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {usersList.length == 0 && (
              <div>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="warning">No users have signed in yet!</Alert>
                </Stack>
              </div>
            )}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>
  )
}
