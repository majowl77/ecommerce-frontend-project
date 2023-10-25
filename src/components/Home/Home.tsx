import BestSellerItems from './BestSellerItems'
import Categories from './Categories'
import PlantsCare from './PlantsCare'
import NavBar from './NavBar'
import Footer from './Footer'

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
          <button> Shope Now </button>
        </div>
      </section>
      <PlantsCare />
      <BestSellerItems />
      <Categories />
      <Footer />
    </div>
  )
}
