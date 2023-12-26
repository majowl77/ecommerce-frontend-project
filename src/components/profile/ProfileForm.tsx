import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { updateSingleUserInfoThunk, usersSliceActions } from '../../redux/slices/user/userSlice'
import { UserInfo } from '../../types/users/usersType'
import { AxiosError } from 'axios'

const initialUSerState: UserInfo = {
  firstName: '',
  lastName: ''
}

export default function ProfileForm() {
  const dispatch = useDispatch<AppDispatch>()
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUSerState)
  const isEditForm = useSelector((state: RootState) => state.usersR.isEditForm)
  const loggedUser = useSelector((state: RootState) => state.usersR.loggedUser)

  useEffect(() => {
    if (isEditForm && loggedUser?._id) {
      const { firstName, lastName } = loggedUser
      setUserInfo({ firstName, lastName })
    }
  }, [isEditForm, loggedUser])

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

    const userId = loggedUser?._id
    if (isEditForm && userId) {
      try {
        const res = await dispatch(
          updateSingleUserInfoThunk({ userId, updatedData: userInfo })
        ).unwrap()
        toast.success(res.msg)
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error('somthing went wrong' + error)
          return
        }
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
