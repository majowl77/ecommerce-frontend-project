import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareInstagram,
  faSquareXTwitter,
  faFacebookSquare
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="footerContanier">
      <div className="footerNameNInfo">
        <div className="footerName">
          <h1> GreenPlant</h1>
          <p> We help you find your dream plant</p>
          <div className="socailMediaContanier">
            <ul className="socailMedia">
              <li>
                <FontAwesomeIcon icon={faFacebookSquare} />
              </li>
              <li>
                <FontAwesomeIcon icon={faSquareXTwitter} />
              </li>
              <li>
                <FontAwesomeIcon icon={faSquareInstagram} />
              </li>
            </ul>
          </div>
        </div>
        <div className="footerInfo">
          <h5> Information </h5>
          <ul className="footerList">
            <li className="elementFooter"> Home </li>
            <li className="elementFooter"> Products </li>
            <li className="elementFooter"> About Us </li>
            <li className="elementFooter" id="loginFooter">
              Login
            </li>
          </ul>
        </div>
      </div>
      <div className="rightReserved">
        <p> @2023 all Right Reserved Term of use GREENPLANT</p>
      </div>
    </footer>
  )
}
