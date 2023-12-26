import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'

import { AppDispatch, RootState } from '../../redux/store'
import { loginThunk } from '../../redux/slices/user/userSlice'
import { logInRegisterActions } from '../../redux/slices/loginRegister/loginRegisterSlice'
import { loginSchema } from '../../utils/constants'
import { LoginSchema } from '../../types/loginRegister/loginRegister'
import { getCartItemsThunk } from '../../redux/slices/cart/cartSlice'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        {' '}
        GreenPlants{' '}
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
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  // for signup Managing :
  function HandleSignUpDisplay() {
    dispatch(logInRegisterActions.setSignUpPage())
  }

  async function onSubmitHandler(data: LoginSchema) {
    try {
      const action = await dispatch(loginThunk(data)).unwrap()
      const { user, message } = action?.data
      const { firstName } = user
      toast.success(`Welcome back! ${firstName} ${message}`)
      dispatch(getCartItemsThunk())
      if (user.role === 'ADMIN') {
        navigate('/admin')
      } else if (user.role === 'USER') navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('somthing went wrong' + error)
        return
      }
      toast.error('Login failed.' + error)
    }
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
                {...register('email')}
              />
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
              <Button
                variant="contained"
                color="success"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}>
                {users.isLoading ? 'Logging...' : 'Login'}
              </Button>
            </form>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPassword">
                  <Typography variant="body2">Forgot password?</Typography>
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
