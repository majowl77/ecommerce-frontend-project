import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import { useNavigate } from 'react-router'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import { Link } from '@material-ui/core'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { AppDispatch, RootState } from '../../redux/store'
import { forgotPasswordThunk } from '../../redux/slices/user/userSlice'
import { forgotPassEmailSchema } from '../../utils/constants'
import { ForgotPassEmailSchema } from '../../types/loginRegister/loginRegister'
import ForgotPasswordModal from './ForgotPasswordModal'
import { navBarActions } from '../../redux/slices/navbar/navbarSlice'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const users = useSelector((state: RootState) => state.usersR)
  dispatch(navBarActions.navBarNotInHomePage())

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPassEmailSchema>({
    resolver: zodResolver(forgotPassEmailSchema)
  })

  async function onSubmitHandler(data: ForgotPassEmailSchema) {
    try {
      const action = await dispatch(forgotPasswordThunk(data)).unwrap()
      setOpen(true)
      setTimeout(() => {
        navigate('/')
      }, 10000)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('somthing went wrong' + error)
        return
      }
      toast.error('' + error)
    }
    reset()
  }

  return (
    <div className="forgotPasswordPage">
      <Container component="main" sx={{ marginTop: '0' }} id="passContainer">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <SyncLockIcon />
          </Avatar>
          <Typography component="h1" variant="h5" id="passwordTitle">
            Forgot Your Password?
          </Typography>
          <Typography variant="body2" gutterBottom id="forgotPassSubtitile">
            Enter the email address associated with your account and we'll send you a link to reset
            your password.
          </Typography>

          <form onSubmit={handleSubmit(onSubmitHandler)} className="forgotPassForm">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              helperText={errors.email ? errors.email.message : ''}
              error={!!errors.email}
              {...register('email')}
            />
            <Button variant="contained" color="success" type="submit" fullWidth>
              {users.isLoading ? 'Sending...' : 'Send'}
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/forgotPassword">
                  <Typography variant="body2">Back to Login Page?</Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        {open && (
          <ForgotPasswordModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
        )}
      </Container>
    </div>
  )
}
