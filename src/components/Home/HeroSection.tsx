import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <div>
      <section className="heroSection">
        <div className="heroBoday">
          <h1>
            Bring <span>Serenity</span> to Your Place With Interior <span className="typewriter-animation"> Plants</span>
          </h1>
          <p>find your dream plant for you home decoration with us, and we will make it happen.</p>
          <Link to="/Products">
            <button> Shope Now </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
