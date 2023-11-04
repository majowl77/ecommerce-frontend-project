import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { usersSliceActions } from '../../redux/slices/user/userSlice'
import { toast } from 'react-toastify'
import { DevTool } from '@hookform/devtools'
import { SignUpFormValues } from '../../types/navBar/navBar'
import { logInRegisterActions } from '../../redux/slices/loginRegister/loginRegisterSlice'
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
export default function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const isLogin = useSelector((state: RootState) => state.loginRegisterR.signUpPage)
  const usersList = useSelector((state: RootState) => state.usersR.users)
  const form = useForm<SignUpFormValues>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = form
  // for login Managing :
  function HandleLoginDisplay() {
    dispatch(logInRegisterActions.setLoginPage())
  }
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
        toast.success('Registration successful! Welcome to GreenPlant ')
        navigate('/')
      } else {
        toast.error('Registration failed ')
      }
    } catch (error) {}
  }
  return (
    <div className="register">
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
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="success"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                <button onClick={HandleLoginDisplay}>{'Already have an account? Login'}</button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  )
}
