import { useDispatch } from 'react-redux'

import BestSellerItems from '../components/home/BestSellerItems'
import Categories from '../components/home/Categories'
import PlantsCare from '../components/home/PlantsCare'
import Footer from '../components/home/Footer'
import { AppDispatch } from '../redux/store'
import { navBarActions } from '../redux/slices/navbar/navbarSlice'
import HeroSection from '../components/home/HeroSection'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  dispatch(navBarActions.navBarInHomePage())
  return (
    <div className="Home">
      <HeroSection />
      <PlantsCare />
      <BestSellerItems />
      <Categories />
      <Footer />
    </div>
  )
}
