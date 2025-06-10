import React, { useState } from 'react'
import ProgressBar from '../ProgressBar'
import { shuffle, isEncountered } from '../../utils'
import DEFINITIONS from '../../utils/ANIMALS.json'

function Challenge (props) {
  const {
    day,
    daysWords,
    handleChangePage,
    handleIncrementAttempts,
    handleCompleteDay,
    PLAN
  } = props

  const [wordIndex, setWordIndex] = useState(0)

  const [inputVal, setInputVal] = useState('')
  const [showDefinition, setShowDefinition] = useState(false)

  const [listToLearn, setListToLearn] = useState([
    ...daysWords,
    ...shuffle(daysWords),
    ...shuffle(daysWords)
  ])

  const animalName = listToLearn[wordIndex]

  console.log('Animal is: ', animalName)

  const isNewAnimal =
    showDefinition ||
    (!isEncountered(day, animalName) && wordIndex < daysWords.length)

  const defvar = DEFINITIONS[animalName]

  console.log('Def var is: ', defvar)

  function giveUp () {
    setListToLearn([...listToLearn, animalName])
    setShowDefinition(true)
  }

  return (
    <>
      <section id='challenge'>
        {isNewAnimal && (
          <p className='practiceFont text-small'>First Practice & Memorize</p>
        )}

        <h6>
          {' '}
          <h6 className='text-gradient'>Hint:</h6>
          {defvar}
        </h6>
        {isNewAnimal && <h4 className='text-gradient'>Answer: {animalName}</h4>}
        {isNewAnimal && (
          <p className='text-medium'>
            Read the hint & type in the answer in the text area to practice..
          </p>
        )}
        {!isNewAnimal && <p className='text-medium'>Now guess the Animal..</p>}
        <div className='helper'>
          <div>
            {/*contains all the error correction visual bars */}
            {/*change here is user guesses the animalName by definition */}
            {/**eg. if def is king of jungle animalName or animal is Lion */}
            {[...Array(animalName.length).keys()].map((elem, elemIdx) => {
              const styleToApply =
                inputVal.length < elem + 1
                  ? ''
                  : inputVal.split('')[elemIdx].toLowerCase() ==
                    animalName.split('')[elemIdx].toLowerCase()
                  ? 'correct'
                  : 'incorrect'

              return <div className={' ' + styleToApply} key={elemIdx}></div>
            })}
          </div>

          <input
            value={inputVal}
            onChange={e => {
              if (
                e.target.value.length == animalName.length &&
                e.target.value.length > inputVal.length
              ) {
                //compare names

                handleIncrementAttempts()
                if (e.target.value.toLowerCase() == animalName.toLowerCase()) {
                  if (wordIndex >= listToLearn.length - 1) {
                    handleCompleteDay()
                    return
                  }
                  setWordIndex(wordIndex + 1)
                  setShowDefinition(false)
                  setInputVal('')
                  return
                }
              }

              setInputVal(e.target.value)
            }}
            type='text'
            placeholder='Guess the Animal..'
          />
        </div>

        <div className='challenge-btns'>
          <button
            onClick={() => {
              handleChangePage(1)
            }}
            className='card-button-secondary'
          >
            <h6>I Quit</h6>
          </button>

          <button onClick={giveUp} className='card-button-primary'>
            <h6>Reveal</h6>
          </button>
        </div>
      </section>
      <ProgressBar
        remainder={(wordIndex * 100) / listToLearn.length}
        text={`${wordIndex} /  ${listToLearn.length}`}
      />
    </>
  )
}

export default Challenge
