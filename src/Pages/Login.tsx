import React, { useState } from 'react'
import NavBar from '../components/Home/NavBar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Login() {
  const [userLogin, setUserLogin] = useState<{name:string, email:string}>({name: "" , email: ""});

  function getUserName(event : React.ChangeEvent<HTMLInputElement>){
    setUserLogin({...userLogin, name: event.target.value})
  }
  function getUserEmail(event : React.ChangeEvent<HTMLInputElement>){
    setUserLogin({...userLogin, email: event.target.value})
  }
  function onSubmitHandler(event:  React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(userLogin);
    setUserLogin({...userLogin, name:"", email:""})
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
                width: 500,
                height: 300,
                bgcolor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 4
              }}>
              <form onSubmit={onSubmitHandler}>
                <TextField label="Name" variant="outlined" fullWidth margin="normal" onChange={getUserName} value={userLogin.name} />
                <TextField label="Email" variant="outlined" fullWidth margin="normal" onChange={getUserEmail} value={userLogin.email} />
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
            </Paper>
          </Box>
        </div>

    </div>
  )
}
