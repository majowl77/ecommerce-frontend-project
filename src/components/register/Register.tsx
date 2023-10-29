import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import axios from 'axios'
import { usersSliceActions } from '../../redux/slices/user/userSlice'
import { toast } from 'react-toastify'
import { DevTool } from '@hookform/devtools'
import { SignUpFormValues } from '../../types/type'

export default function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const usersList = useSelector((state: RootState) => state.usersR.users)
  const form = useForm<SignUpFormValues>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = form

  function onSubmitHandler(data: SignUpFormValues) {
    console.log('date before ', data)
    try {
      const newUser = usersList.find((userData) => userData.email === data.email)
      if (newUser) {
        toast.error('Email already existed ! try to login inested ')
      } else if (!newUser) {
        data.id = +new Date()
        data.role = 'visitor'
        dispatch(usersSliceActions.addOneUser({ data }))
        console.log('data after ', data)
        toast.success('Login success ')
      } else {
        toast.error('Login failed ')
      }
    } catch (error) {}
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ''}
          {...register('firstName', {
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: 'First name must consist of letters and spaces only.'
            }
          })}
        />
        <TextField
          label="Last Name "
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ''}
          {...register('lastName', {
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: 'Last name must consist of letters and spaces only.'
            }
          })}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          helperText={errors.email ? errors.email.message : ''}
          error={!!errors.email}
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address. email@example.com'
            }
          })}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            }
          })}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            marginTop: 6,
            bgcolor: '#73906f'
          }}>
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
