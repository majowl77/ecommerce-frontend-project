import { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { AppDispatch, RootState } from '../redux/store'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'
import { activateUser } from '../redux/slices/loginRegister/loginRegisterSlice'

export default function Activation() {
  const dispatch = useDispatch<AppDispatch>()
  let activationReducer = useSelector((state: RootState) => state.loginRegisterR)

  const { activationToken } = useParams()
  console.log('🚀 ~ Activation ~ activationToken:', activationToken)
  dispatch(navBarActions.navBarNotInHomePage())

  useEffect(() => {
    dispatch(activateUser(activationToken))
  }, [activationToken])

  return (
    <div className="ActivationPage">
      {(activationReducer.message && (
        <div className="ActivationPageBody">
          <div className="messageAndImg">
            <img
              src="https://media.tenor.com/1Z_CN1hhaAYAAAAi/check-mark-good.gif"
              width="200px"
              height="200px"
            />
            <Typography variant="h6" gutterBottom marginBottom={0} id="activationMessage">
              <p>{activationReducer.message}</p>
            </Typography>
          </div>
        </div>
      )) ||
        (activationReducer.error && (
          <div className="ActivationPageBody">
            <div className="messageAndImg">
              <img
                src="https://media.tenor.com/aRX6P1QWSeAAAAAi/cross.gif"
                width="150px"
                height="150px"
              />
              <Typography variant="h6" gutterBottom marginBottom={0} id="activationMessage">
                <p>{activationReducer.error}</p>
              </Typography>
            </div>
          </div>
        ))}
    </div>
  )
}
