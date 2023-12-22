import React from 'react'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'
import Link from '@mui/material/Link'

export default function NotFound() {
  const dispatch = useDispatch<AppDispatch>()
  dispatch(navBarActions.navBarNotInHomePage())

  return (
    <div className="notFoundPage">
      <div className="titleAndSubtitle">
        <Typography variant="h2" gutterBottom marginBottom={0}>
          404 Page Not Found
        </Typography>
        <Typography variant="subtitle1" gutterBottom marginTop={2}>
          Oops! It seems like the page you were trying to reach doesn't exist.
        </Typography>
        <div className="subtitle">
          <Typography variant="subtitle2" gutterBottom align="left">
            Let's get you back on track:
            <Typography variant="body2" gutterBottom align="left">
              - Go back to the<Link href="/" underline="always"> Home Page </Link>
            </Typography>
            <Typography variant="body2" gutterBottom align="left">
              - Use the navigation menu above
            </Typography>
          </Typography>
        </div>
      </div>
      <img src="public/images/dead_flower.png" width={200} />
    </div>
  )
}
