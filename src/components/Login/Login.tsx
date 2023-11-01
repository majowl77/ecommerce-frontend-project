import React, { useEffect, useState } from 'react'
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
import { LogInFormValues } from '../../types/type'
import { Navigate, useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const usersList = useSelector((state: RootState) => state.usersR.users)
  const form = useForm<LogInFormValues>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = form

  function onSubmitHandler(data: LogInFormValues) {
    console.log(data)
    try {
      const foundUser = usersList.find((userData) => userData.email === data.email)
      if (foundUser && foundUser.password === data.password) {
        dispatch(usersSliceActions.isLogedIn({ foundUser }))
        toast.success('Login success ')
        if (foundUser.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        toast.error('Login failed ')
      }
    } catch (error) {}
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
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
        <Typography variant="subtitle1" gutterBottom>
          forget your Password ?
        </Typography>
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
