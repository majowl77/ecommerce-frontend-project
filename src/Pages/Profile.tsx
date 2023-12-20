import Button from '@mui/material/Button'
import WestIcon from '@mui/icons-material/West'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'
import { usersSliceActions } from '../redux/slices/user/userSlice'
import ProfileForm from '../components/profile/ProfileForm'
import { ROLES, User } from '../types/users/usersType'
export default function Profile() {
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.usersR.loggedUser)
  const popUp = useSelector((state: RootState) => state.usersR.popUp)
  const isLogedIn = useSelector((state: RootState) => state.usersR.isLogedIn)
  const duringPopUp = popUp ? ' duringPopup' : ''
  dispatch(navBarActions.navBarNotInHomePage())

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
          {currentUser && (
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
                <h1 id="profileName"> First Name : {currentUser.firstName}</h1>
                <h1 id="profileName"> Last Name :{currentUser.lastName}</h1>
                <p id="productDescription">
                  {currentUser?.role === ROLES.ADMIN ? <p> Admin</p> : <p> Customer</p>}
                </p>
                <div className="profileButton">
                  <button id="profileButton" onClick={() => onEdit(currentUser._id)}>
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
