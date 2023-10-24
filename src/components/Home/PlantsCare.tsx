import React from 'react'
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

export default function PlantsCare() {
  return (
    <div className="plantsCare">
      <div className="plantsCareTitle">
        <h2> steps to take care of your plants</h2>
        <p>
          By following these three steps - proper watering, appropriate sunlight, and providing
          essential nutrients - you'll be well on your way to maintaining healthy and thriving
          plants.
        </p>
      </div>
      <div className="plantsCardContainer">
        <div className="cardsInfo">
          <div className="cardImg">
            <WaterDropOutlinedIcon></WaterDropOutlinedIcon>
          </div>
          <h6> Watering</h6>
          <p>
            water your plants when the top inch of soil feels dry to the touch. Avoid overwatering,
            as it can lead to root dehydration.
          </p>
        </div>
        <div className="cardsInfo">
          <div className="cardImg">
            <LightModeOutlinedIcon></LightModeOutlinedIcon>
          </div>
          <h6> Watering</h6>
          <p>
            water your plants when the top inch of soil feels dry to the touch. Avoid overwatering,
            as it can lead to root dehydration.
          </p>
        </div>
        <div className="cardsInfo">
          <div className="cardImg">
            <WaterDropOutlinedIcon></WaterDropOutlinedIcon>
          </div>
          <h6> Watering</h6>
          <p>
            water your plants when the top inch of soil feels dry to the touch. Avoid overwatering,
            as it can lead to root dehydration.
          </p>
        </div>
      </div>
    </div>
  )
}
