import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

export default function Categories() {
  return (
    <section className="categoriesSection">
      <div className="categoriesHeadline">
        <h1> Categories</h1>
        <p> Find what you are looking for</p>
      </div>
      <div className="categoriesList">
        <div className="categoriesImage">
          <img src="public/Natural Plants.png" />
          <p> Natural Plants</p>
        </div>
        <div className="categoriesMainImage">
          <img src="public/Plant Accessories.png" />
          <p> Plant Accessories</p>
          <button>
            Explore <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
        <div className="categoriesImage">
          <img src="public/Artificial Plants.png" />
          <p> Artificial Plants</p>
        </div>
      </div>
    </section>
  )
}
