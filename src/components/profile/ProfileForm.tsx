import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { User } from '../../types/users/usersType'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { updateSingleUserInfoThunk, usersSliceActions } from '../../redux/slices/user/userSlice'
import { getDecodedTokenFromStorage } from '../../utils/token'
import { toast } from 'react-toastify'

export type UserInfo = {
  firstName: string
  lastName: string
}
const initialUSerState: UserInfo = {
  firstName: '',
  lastName: ''
}

export default function ProfileForm() {
  const dispatch = useDispatch<AppDispatch>()
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUSerState)
  const usersList = useSelector((state: RootState) => state.usersR.users)
  const isEditForm = useSelector((state: RootState) => state.usersR.isEditForm)
  const currentUser = useSelector((state: RootState) => state.usersR.decodedUser)

  useEffect(() => {
    if (isEditForm && currentUser?.userID) {
      const { firstName, lastName } = currentUser
      setUserInfo({ firstName, lastName })
    }
  }, [isEditForm, currentUser])

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const userId = currentUser?.userID
    if (isEditForm && userId) {
      const res = await dispatch(updateSingleUserInfoThunk({ userId, updatedData: userInfo }))
      console.log('🚀 ~ file: ProfileForm.tsx:55 ~ handleSubmit ~ res:', res)
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success(res.payload.msg)
      }
      if (res.meta.requestStatus === 'rejected') {
        toast.error('somthing went wrong while updateing profile info ')
      }
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
