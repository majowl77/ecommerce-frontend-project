import Button from '@mui/material/Button'
import WestIcon from '@mui/icons-material/West'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'
import {
  getSingleUserThunk,
  getUsersThunk,
  usersSliceActions
} from '../redux/slices/user/userSlice'
import ProfileForm from '../components/profile/ProfileForm'
import { ROLES, User } from '../types/users/usersType'
import { useEffect } from 'react'

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.usersR.decodedUser)
  const popUp = useSelector((state: RootState) => state.usersR.popUp)
  const loggedUser = useSelector((state: RootState) => state.usersR.loggedUser)
  const duringPopUp = popUp ? ' duringPopup' : ''
  dispatch(navBarActions.navBarNotInHomePage())

  useEffect(() => {
    async function fetchUsersData() {
      const userId = currentUser.userID
      dispatch(getSingleUserThunk(userId))
    }
    fetchUsersData()
  }, [])

  //open Edit category form
  function onEdit(userId: User['_id']) {
    dispatch(usersSliceActions.openEditProfileForm())
    dispatch(usersSliceActions.setPopUp(true))
  }
  return (
    <div className={'profilePage' + duringPopUp}>
      <div className="oneProduct">
        <div className="displayProductsDetails">
          <div className="bottomBorder">
            <div className="backButton">
              <Link to="/">
                <Button variant="text" color="inherit" startIcon={<WestIcon />}>
                  Back To Home Page
                </Button>
              </Link>
            </div>
          </div>
          {loggedUser && (
            // fixed pictuer for now :)
            <div className="insideProductDetails">
              <div className="profileImage">
                <img
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmKPN7_d0D_NxxRu4H4oSGEp0dAHoQH10VLyTrSrQYOmNSj1dXr32IgNaJRewkDwmC60&usqp=CAU'
                  }
                  alt="Profile Photo"
                />
              </div>

              <div className="profileInfo">
                <h1 id="profileName"> First Name : {loggedUser.firstName}</h1>
                <h1 id="profileName"> Last Name :{loggedUser.lastName}</h1>
                <p id="productDescription">
                  {currentUser?.role === ROLES.ADMIN ? <p> Admin</p> : <p> Customer</p>}
                </p>
                <div className="profileButton">
                  <button id="profileButton" onClick={() => onEdit(currentUser.userID)}>
                    Edit Profile Info
                  </button>
                </div>
              </div>
            </div>
          )}
          <div>
            <div>{popUp && <ProfileForm />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
