import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DevTool } from '@hookform/devtools'
import { useNavigate } from 'react-router'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'

import { LogInFormValues } from '../../types/loginRegister/loginRegister'
import { AppDispatch, RootState } from '../../redux/store'
import { loginThunk, usersSliceActions } from '../../redux/slices/user/userSlice'
import { logInRegisterActions } from '../../redux/slices/loginRegister/loginRegisterSlice'
import { AxiosError } from 'axios'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.usersR)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LogInFormValues>()

  // for signup Managing :
  function HandleSignUpDisplay() {
    dispatch(logInRegisterActions.setSignUpPage())
  }

  async function onSubmitHandler(data: LogInFormValues) {
    try {
      const response = await dispatch(loginThunk(data))

      if (response.meta.requestStatus === 'fulfilled') {
        const res = response.payload.user.firstName
        const msg = response.payload.message
        const token = response.payload.token
        toast.success('Welcome back!' + res + msg)
        localStorage.setItem('token', token)
        if (users.loggedUser?.role === 'ADMIN') {
          console.log(
            '🚀 ~ file: Login.tsx:65 ~ onSubmitHandler ~ users.loggedUser:',
            users.loggedUser
          )
          navigate('/admin')
        } else if (users.loggedUser?.role === 'USER') navigate('/')
      }
      if (response.meta.requestStatus === 'rejected') {
        toast.error('Login failed.' + response.payload)
        //   navigate('/admin')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('somthing went wrong when login')
      }
    }
    console.log(users.decodedUser, 'ddddecodedUser')
    reset()
  }

  return (
    <div>
      <div className="login">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                helperText={errors.email ? errors.email.message : ''}
                error={!!errors.email}
                {...register('email', {
                  required: 'Email is required',
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
                type="password"
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
                color="success"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}>
                {users.isLoading ? 'Loging...' : 'Login'}
              </Button>
            </form>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <button onClick={HandleSignUpDisplay}>Don't have an account? Sign Up</button>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </div>
  )
}
