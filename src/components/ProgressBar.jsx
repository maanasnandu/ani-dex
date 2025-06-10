import React from 'react'

function ProgressBar (props) {
  const { text, remainder } = props

  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div>
      <div className='level'>
        <div>
          <h6>{text}</h6>
        </div>

        {/*iteratively render content using array.map */}
        {arr.map((ele, elemIdx) => {
          return <div className='level-bar' key={elemIdx}></div>
        })}

        <div className='xp' style={{ width: `${remainder}%` }}></div>
      </div>
    </div>
  )
}

export default ProgressBar
