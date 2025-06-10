import React from 'react'

function History (props) {
  const { history } = props

  const historyKeys = Object.keys(history)

  return (
    <div>
      <div className='card history-card'>
        <h6>History</h6>

        {historyKeys.length === 0 ? (
          <p>
            You have no attempts! Press <b>Start</b> to begin the encounter
          </p>
        ) : (
          <div className='history-list'>
            {historyKeys.map((elem, elemIndx) => {
              const dateKey = new Date(elem)
                .toString()
                .split(' ')
                .slice(1, 4)
                .join(' ')
              return (
                <div key={elemIndx} className='card-button-secondary'>
                  <div>
                    <p>Started</p>
                    <h6>{dateKey}</h6>
                  </div>
                  <div>
                    <p>Streak</p>
                    <h6>{history[elem]}</h6>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default History
