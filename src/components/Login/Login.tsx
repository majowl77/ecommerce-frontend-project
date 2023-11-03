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
import { useNavigate } from 'react-router'

import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'
import { logInRegisterActions } from '../../redux/slices/loginRegister/loginRegisterSlice'
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
}
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const isSignUp = useSelector((state: RootState) => state.loginRegisterR.signUpPage)
  const usersList = useSelector((state: RootState) => state.usersR.users)
  const form = useForm<LogInFormValues>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = form

  // for signup Managing :
  function HandleSigninDisplay() {
    dispatch(logInRegisterActions.setSignUpPage())
  }
  function onSubmitHandler(data: LogInFormValues) {
    console.log(data)
    try {
      const foundUser = usersList.find((userData) => userData.email === data.email)
      if (foundUser && foundUser.password === data.password) {
        dispatch(usersSliceActions.isLogedIn({ foundUser }))
        toast.success("Welcome back! You've successfully logged in")
        if (foundUser.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        toast.error('Login failed. Please check your email and password')
      }
    } catch (error) {}
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
                Submit
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
                  <button onClick={HandleSigninDisplay}>{"Don't have an account? Sign Up"}</button>
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
