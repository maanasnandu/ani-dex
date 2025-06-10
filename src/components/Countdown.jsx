import React, { useEffect, useState } from 'react'
import { convertMilliseconds, countdownIn24Hours } from '../utils'

function Countdown (props) {
  const { handleChangePage, daysWords, datetime, day } = props

  const targetMilliseconds = datetime || Date.UTC(1944, 2, 17, 12, 0, 0)

  const [remainingMs, setRemainingMS] = useState(
    countdownIn24Hours(targetMilliseconds)
  )

  const timer = convertMilliseconds(remainingMs)

  useEffect(()=> {
    const interval = setInterval(()=>{
      setRemainingMS(countdownIn24Hours(targetMilliseconds))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetMilliseconds])

  return (
    <div className='card countdown-card'>
      <h1 className='item-header'>Day {day}</h1>
      <div className='today-container'>
        <div>
          <p>Time remaining</p>
          <h4>
            {datetime
              ? `${Math.abs(timer.hours)}H ${Math.abs(
                  timer.minutes
                )}M ${Math.abs(timer.seconds)}S `
              : '23H 59M 59S'}
          </h4>
        </div>

        <div>
          <p>Animals encountered today</p>
          <h4>{daysWords.length}</h4>
        </div>
      </div>

      <button onClick={()=>{handleChangePage(2)}} className='start-task'>
        <h6>Start</h6>
      </button>
    </div>
  )
}

export default Countdown
