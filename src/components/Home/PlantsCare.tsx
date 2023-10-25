/* eslint-disable react/no-unescaped-entities */
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'

export default function PlantsCare() {
  return (
    <section className="plantsCare">
      <div className="plantsCareTitle">
        <h2>
          steps to take care of your <span> plants</span>
        </h2>
        <p>
          By following these three steps - proper watering, appropriate sunlight, and providing
          essential nutrients - you'll be well on your way to maintaining healthy and thriving
          plants.
        </p>
      </div>
      <div className="plantsCardContainer">
        <div className="cardsInfo">
          <div className="cardImg">
            <WaterDropOutlinedIcon
              role="img"
              aria-label="Water Droplet Icon"></WaterDropOutlinedIcon>
          </div>
          <h6> Watering</h6>
          <p>
            water your plants when the top inch of soil feels dry to the touch. Avoid overwatering,
            as it can lead to root dehydration.
          </p>
        </div>
        <div className="cardsInfo">
          <div className="cardImg">
            <LightModeOutlinedIcon role="img" aria-label="Sunlight Icon"></LightModeOutlinedIcon>
          </div>
          <h6> Sunlight</h6>
          <p>
            Most plants need adequate sunlight to thrive. Place your plants where they get the right
            amount of light for their needs
          </p>
        </div>
        <div className="cardsInfo">
          <div className="cardImg">
            <LocalFloristIcon role="img" aria-label="Local Florist Icon"></LocalFloristIcon>
          </div>
          <h6> Nutrition and Fertilization</h6>
          <p>
            Provide essential nutrients for your plant's growth. Use a balanced fertilizer and
            follow the recommended schedule for application.
          </p>
        </div>
      </div>
    </section>
  )
}
