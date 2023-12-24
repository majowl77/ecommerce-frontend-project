import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import Container from '@mui/material/Container'

import { registerThunk } from '../../redux/slices/user/userSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { RegisterSchema } from '../../types/loginRegister/loginRegister'
import { logInRegisterActions } from '../../redux/slices/loginRegister/loginRegisterSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import RegisterModal from './RegisterModal'
import { registerSchema } from '../../utils/constants'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
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
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  // for login Managing :
  function HandleLoginDisplay() {
    dispatch(logInRegisterActions.setLoginPage())
  }

  async function onSubmitHandler(data: RegisterSchema) {
    console.log('date before ', data)
    const userData = data
    try {
      const response = await dispatch(registerThunk(userData))
      if (response.meta.requestStatus === 'fulfilled') {
        setOpen(true)
        setTimeout(() => {
          navigate('/')
        }, 10000)
      }
      if (response.meta.requestStatus === 'rejected') {
        // Handle error from zod in the backend
        const errors = response.payload
        if (typeof errors === 'string') {
          toast.error(errors)
          return
        }

        // Iterate through each error and display a toast for each
        errors.forEach((error: any) => {
          toast.error(`${error.path.join('.')} ${error.message.replace(/String /i, '')}`)
        })
      }
    } catch (error) {
      toast.error(error + 'Registration failed ')
    }
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
                  {...register('firstName')}
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
                  {...register('lastName')}
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
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  {...register('password')}
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
      {open && <RegisterModal open={open} handleOpen={handleOpen} handleClose={handleClose} />}
    </div>
  )
}
