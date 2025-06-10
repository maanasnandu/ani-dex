import React from 'react'
import ProgressBar from './ProgressBar'
import { calcLevel, calculateAccuracy, calculateNewWords } from '../utils'

function Stats (props) {
  const { name, day, PLAN, attempts } = props

  const currentLvl = calcLevel(day)
  const flooredLvl = Math.floor(currentLvl)

  const remainder = (currentLvl - flooredLvl) * 100

  return (
    <div className='card stats-card'>
      <div className='welcome-text'>
        <h6>Welcome</h6>
        <h6 className='text-medium'>{name}</h6>
      </div>

      <div className='stats-column'>
        <div>
          <p>
            Streak <i className='fa-solid fa-fire'></i>
          </p>
          <h6>{day - 1}</h6>
        </div>

        <div>
          <p>
            Encountered <i className='fa-solid fa-magnifying-glass'></i>
          </p>
          <h6>{calculateNewWords(day - 1)}</h6>
        </div>

        <div>
          <p>Accuracy (%)</p>
          <h6>{(calculateAccuracy(attempts, day) * 100).toFixed(1)}</h6>
        </div>
      </div>

      <ProgressBar text={`lvl ${flooredLvl}`} remainder={remainder}/>
    </div>
  )
}

export default Stats
