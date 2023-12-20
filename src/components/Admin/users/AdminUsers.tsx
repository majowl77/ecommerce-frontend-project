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
import LinearProgress from '@mui/joy/LinearProgress'

import {
  deleteUsersThunk,
  getUsersThunk,
  grantRoleUserThunk,
  usersSliceActions
} from '../../../redux/slices/user/userSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Role, ROLES, User } from '../../../types/users/usersType'
import { toast } from 'react-toastify'

export default function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>()
  const usersList = useSelector((state: RootState) => state.usersR.users)
  const users = useSelector((state: RootState) => state.usersR)

  useEffect(() => {
    function fetchUsersData() {
      dispatch(getUsersThunk())
    }
    fetchUsersData()
  }, [])

  //handle role granting
  const handleRoleChange = async (newValue: {} | null, userId: User['_id']) => {
    if (typeof newValue === 'string') {
      const role = newValue
      const res = await dispatch(grantRoleUserThunk({ role, userId }))
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Role changed sccussfuly!')
        return
      }
      if (res.meta.requestStatus === 'rejected') {
        toast.error("Can't change the user Role!")
        return
      }
    }
  }

  //removing a User
  function handleDeletingUser(userId: User['_id']) {
    if (userId != null) {
      console.log('🚀 ~ file: AdminUsers.tsx:58 ~ handleDeletingUser ~ userId:', userId)
      dispatch(deleteUsersThunk(userId))
    }
  }
  return (
    <div>
      {users.isLoading === true && <LinearProgress color="success" value={40} variant="solid" />}

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
            {usersList && (
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
            {usersList &&
              usersList.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isActive ? 'activated' : 'inactive'}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {users.isLoading ? (
                      <LinearProgress variant="plain" />
                    ) : (
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
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className="adminButton"
                      onClick={() => handleDeletingUser(user._id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {usersList.length === 0 && users.isLoading === false && (
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
