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
          <img src="https://majedah-bucket.s3.eu-west-2.amazonaws.com/Natural+Plants-1703590672472-563829960.png" />
          <p> Natural Plants</p>
        </div>
        <div className="categoriesMainImage">
          <img src="https://majedah-bucket.s3.eu-west-2.amazonaws.com/Plant+Accessories-1703590278898-404969444.png" />
          <p> Plant Accessories</p>
          <Link to="/Products">
            <button>
              Explore <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </Link>
        </div>
        <div className="categoriesImage">
          <img src="https://majedah-bucket.s3.eu-west-2.amazonaws.com/Artificial+Plants-1703590613165-457946824.png" />
          <p> Artificial Plants</p>
        </div>
      </div>
    </section>
  )
}
