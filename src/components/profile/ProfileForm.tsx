import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { User } from '../../types/users/usersType'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { usersSliceActions } from '../../redux/slices/user/userSlice'
const initialUSerState: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: 'USER',
  isActive: null
}
export default function ProfileForm() {
  const dispatch = useDispatch<AppDispatch>()
  const [userInfo, setUserInfo] = useState<User>(initialUSerState)
  const usersList = useSelector((state: RootState) => state.usersR.users)
  const isEditForm = useSelector((state: RootState) => state.usersR.isEditForm)
  const LoggedInUser = useSelector((state: RootState) => state.usersR.decodedUser)

  useEffect(() => {
    if (isEditForm && LoggedInUser?._id) {
      const userData = usersList.find((user) => user._id === LoggedInUser._id)
      if (userData) {
        setUserInfo(LoggedInUser)
      }
    }
  }, [isEditForm, LoggedInUser])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }
  function handleClosePopUp() {
    dispatch(usersSliceActions.closeEditForm())
    dispatch(usersSliceActions.setPopUp(false))
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isEditForm) {
      dispatch(usersSliceActions.editUserInfo({ userInfo }))
    }
    setUserInfo(initialUSerState)
    dispatch(usersSliceActions.closeEditForm())
    dispatch(usersSliceActions.setPopUp(false))
  }
  return (
    <div id="popUp">
      <h1>Edit Your Profile</h1>
      <div className="popUpCloseButton">
        <Button type="submit" variant="text" onClick={handleClosePopUp}>
          <CloseIcon />
        </Button>
      </div>
      <Box width="50%">
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="firstName"
              label="first Name"
              variant="outlined"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleChange}
              fullWidth
              sx={{ padding: '8px', marginTop: '10px' }}
              required
            />
          </div>
          <div>
            <TextField
              id="lastName"
              label="last Name"
              variant="outlined"
              name="lastName"
              value={userInfo.lastName}
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
            Save Changes
          </Button>
        </form>
      </Box>
    </div>
  )
}
