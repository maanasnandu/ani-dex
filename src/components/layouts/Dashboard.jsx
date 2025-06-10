import React from 'react'
import Stats from '../Stats'
import Countdown from '../Countdown'
import History from '../History'

function Dashboard (props) {

  

  return (
    <section id="dashboard">
        {/*sending dashboard's props to Stats component using spread operator */}
        <Stats {...props}/>
        <Countdown {...props}/>
        <History {...props}/>
    </section>
  )
}

export default Dashboard
