import React, { useEffect, useState } from 'react'
import NavBar from '../components/home/NavBar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Login from '../components/Login/Login'
import Register from '../components/register/Register'

export default function LoginRegister() {
  // for login Managing :
  const [isLogin, setIsLogin] = useState(true)
  function HandleLoginDisplay() {
    setIsLogin(true)
    setIsSignUp(false)
  }
  // for signup Managing :
  const [isSignUp, setIsSignUp] = useState(false)
  function HandleSigninDisplay() {
    setIsSignUp(true)
    setIsLogin(false)
  }

  return (
    <div className="loginPage">
      <NavBar />
      <h1> Login</h1>
      <div className="formContainer">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            '& > :not(style)': {
              m: 1,
              width: 560,
              height: 423,
              color: '#f4f4f4'
            }
          }}>
          <Paper
            sx={{
              width: 600,
              height: 300,
              bgcolor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 4
            }}>
            <div>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  onClick={HandleLoginDisplay}
                  value="login"
                  style={{ padding: '10px 104px' }}>
                  LogIn
                </Button>
                <Button
                  onClick={HandleSigninDisplay}
                  value="signup"
                  style={{ padding: '10px 104px' }}>
                  SignUP
                </Button>
              </ButtonGroup>
            </div>
            {isLogin && <Login />}
            {isSignUp && <Register />}
          </Paper>
        </Box>
      </div>
    </div>
  )
}
