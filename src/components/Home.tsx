import React from 'react'
import HeroSection from './Home/HeroSection'
import PlantsCare from './Home/PlantsCare'
import NavBar from './NavBar'

export default function Home() {
  return (
    <div className="Home">
      <NavBar />
      <div className="heroSection">
        <div>
          <h1>
            Bring <span>Serenity</span> to Your Place With Interior Plants
          </h1>
          <p>find your dream plant for you home decoration with us, and we will make it happen.</p>
          <button> Shope Now </button>
        </div>
      </div>
      <PlantsCare />
    </div>
  )
}
