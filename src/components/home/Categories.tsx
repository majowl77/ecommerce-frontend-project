import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Categories() {
  return (
    <section className="categoriesSection">
      <div className="categoriesHeadline">
        <h1> Categories</h1>
        <p> Find what you are looking for</p>
      </div>
      <div className="categoriesList">
        <div className="categoriesImage">
          <img src="public/images/Natural Plants.png" />
          <p> Natural Plants</p>
        </div>
        <div className="categoriesMainImage">
          <img src="public/images/Plant Accessories.png" />
          <p> Plant Accessories</p>
          <Link to="/Products">
          <button>
            Explore <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
          </Link>
        </div>
        <div className="categoriesImage">
          <img src="public/images/Artificial Plants.png" />
          <p> Artificial Plants</p>
        </div>
      </div>
    </section>
  )
}
