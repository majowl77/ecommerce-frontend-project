import React from 'react'

export default function Register() {
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={getUserName}
          value={userLogin.name}
        />
        <TextField
          label="Last Name "
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={getUserName}
          value={userLogin.name}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={getUserEmail}
          value={userLogin.email}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={getUserEmail}
          value={userLogin.email}
        />
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
    </div>
  )
}
