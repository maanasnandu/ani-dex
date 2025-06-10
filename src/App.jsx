import React, { useState, useEffect } from 'react'
import Layout from './components/layouts/Layout'
import Welcome from './components/layouts/Welcome'
import Dashboard from './components/layouts/Dashboard'
import Challenge from './components/layouts/Challenge'

import ANIMALS from './utils/ANIMALS.json'
import { countdownIn24Hours, getWordByIndex, PLAN } from './utils'

function App () {
  //const Currentpage = 2
  //0 for welcome 1 is for dashboard, 2 is for challenge pages

  //pages dictionary with key value associated
  // const pages = {
  //   0: <Welcome />,
  //   1: <Dashboard />,
  //   2: <Challenge />
  // }

  //State variables
  //destructuring syntax to receive var name with hook useState with default page as 0
  //2nd entity is the setter function setSelectedPage
  //Whenver we want to update selectedPage, we do it through setter function

  //Stateful variables
  const [selectedPage, setSelectedPage] = useState(0)

  const [name, setName] = useState('')

  const [day, setDay] = useState(1)
  const [datetime, setDateTime] = useState(null)

  const [history, setHistory] = useState({})

  const [attempts, setAttempts] = useState(0)

  const daysWords = PLAN[day].map(idx => {
    return getWordByIndex(ANIMALS, idx).word
  })

  // const daysAnimNames = PLAN[day].map(idx => {
  //   return getWordByIndex(ANIMALS, idx).word
  // })

  //console.log('days words: ', daysAnimNames)

  function handleCompleteDay () {
    const newDay = day + 1
    const newDatetime = Date.now()
    setDay(newDay)
    setDateTime(newDatetime)

    localStorage.setItem(
      'day',
      JSON.stringify({ day: newDay, datetime: newDatetime })
    )

    setSelectedPage(1)
  }

  function handleIncrementAttempts () {
    const newRecord = attempts + 1

    localStorage.setItem('attempts', newRecord)

    setAttempts(newRecord)
  }

  function handleChangePage (pageIndex) {
    setSelectedPage(pageIndex)
  }

  function handleCreateAccount () {
    if (!name) {
      return
    }

    localStorage.setItem('username', name)

    handleChangePage(1)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    if (localStorage.getItem('username')) {
      setName(localStorage.getItem('username'))

      setSelectedPage(1)
    }

    if (localStorage.getItem('attempts')) {
      let data = parseInt(localStorage.getItem('attempts'))
      setAttempts(data)
    }

    if (localStorage.getItem('history')) {
      let history = JSON.parse(localStorage.getItem('history'))
      setHistory(history)
    }

    if (localStorage.getItem('day')) {
      const { day: d, datetime: dt } = JSON.parse(localStorage.getItem('day'))
      setDateTime(dt)
      setDay(d)

      if (d > 1 && dt) {
        const diff = countdownIn24Hours(dt)
        if (diff < 0) {
          let newHistory = { ...history }
          const timestamp = new Date(dt)
          const formattedTimeStamp = timestamp
            .toString()
            .split(' ')
            .slice(1, 4)
            .join(' ')

          newHistory[formattedTimeStamp] = d
          setHistory(newHistory)
          setDay(1)
          setDateTime(null)
          setAttempts(0)
          localStorage.setItem('attempts', 0)
          localStorage.setItem('history', JSON.stringify(newHistory))
          localStorage.setItem(
            'day',
            JSON.stringify({ day: 1, datetime: null })
          )
        }
      }
    }
  }, [])

  const pages = {
    0: (
      <Welcome
        handleCreateAccount={handleCreateAccount}
        username='Maanas'
        name={name}
        setName={setName}
      />
    ),
    1: (
      <Dashboard
        history={history}
        name={name}
        attempts={attempts}
        PLAN={PLAN}
        day={day}
        handleChangePage={handleChangePage}
        daysWords={daysWords}
        datetime={datetime}
      />
    ),
    2: (
      <Challenge
        day={day}
        daysWords={daysWords}
        handleChangePage={handleChangePage}
        handleIncrementAttempts={handleIncrementAttempts}
        handleCompleteDay={handleCompleteDay}
        PLAN={PLAN}
      />
    )
  }

  return (
    <Layout>
      {/*Layout component has these components as children*/
      /*So in Layout component indicate it has children using props*
      <Welcome/>
      <Dashboard/>

      <Challenge/> */}

      {/*conditional rendering based on dictionary given pages based on current page */}
      {pages[selectedPage]}
    </Layout>
  )
}

export default App
