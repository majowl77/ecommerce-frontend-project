import BestSellerItems from '../components/Home/BestSellerItems'
import Categories from '../components/Home/Categories'
import PlantsCare from '../components/Home/PlantsCare'
import NavBar from '../components/Home/NavBar'
import Footer from '../components/Home/Footer'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="Home">
      <NavBar />
      <section className="heroSection">
        <div>
          <h1>
            Bring <span>Serenity</span> to Your Place With Interior Plants
          </h1>
          <p>find your dream plant for you home decoration with us, and we will make it happen.</p>
          <Link to="/Products">
            <button> Shope Now </button>
          </Link>
        </div>
      </section>
      <PlantsCare />
      <BestSellerItems />
      <Categories />
      <Footer />
    </div>
  )
}
