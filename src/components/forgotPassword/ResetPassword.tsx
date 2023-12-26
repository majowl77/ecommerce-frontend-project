import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import { Link } from '@material-ui/core'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import KeyIcon from '@mui/icons-material/Key'

import { AppDispatch, RootState } from '../../redux/store'
import { resetPasswordThunk } from '../../redux/slices/user/userSlice'
import { resetPasswordlSchema } from '../../utils/constants'
import { ResetPasswordlSchema } from '../../types/loginRegister/loginRegister'
import { navBarActions } from '../../redux/slices/navbar/navbarSlice'
import ResetPasswordModal from './ResetPasswordModal'

export default function ResetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { forgotPasswordCode } = useParams()

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
  } = useForm<ResetPasswordlSchema>({
    resolver: zodResolver(resetPasswordlSchema)
  })

  async function onSubmitHandler(data: ResetPasswordlSchema) {
    try {
      const newPassword = data.confirmPassword
      const action = await dispatch(
        resetPasswordThunk({ password: newPassword, forgotPasswordCode })
      ).unwrap()
      const { msg } = action
      toast.success(msg)
      setOpen(true)
      setTimeout(() => {
        navigate('/login')
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
            <KeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Your Password
          </Typography>
          <Typography variant="body2" gutterBottom id="resetPassSubtitile">
            Enter a new password below to chnage your password.
          </Typography>

          <form onSubmit={handleSubmit(onSubmitHandler)} className="resetPassForm">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              {...register('password')}
            />
            <TextField
              label="Confirm password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
              {...register('confirmPassword')}
            />

            <Button variant="contained" color="success" type="submit" fullWidth>
              {users.isLoading ? 'Resetting...' : 'Rest'}
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
          <ResetPasswordModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
        )}
      </Container>
    </div>
  )
}
