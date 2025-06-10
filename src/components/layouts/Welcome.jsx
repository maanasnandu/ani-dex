import React from 'react'

function Welcome (props) {
  //destructuring into separate vars
  const { name, setName, handleCreateAccount } = props

  return (
    <section id='welcome'>
      <h6 className='text-medium special-shadow'>
        Ready for an Adventure?
        <br />
        Your Daily Animal Discovery Starts Here!
      </h6>

      <p className='text-medium'>
        Encounter & memorize new Animals every day. <br />
        Build Your Epic Ani-Dex! <i className='fa-solid fa-otter'></i>
      </p>

      <div>
        <input
          value={name}
          onChange={event => {
            setName(event.target.value)
          }}
          type='text'
          placeholder='Enter your name...'
        />
        <button disabled={!name} onClick={handleCreateAccount}>
          <h6>Start &rarr;</h6>
        </button>
      </div>
    </section>
  )
}

export default Welcome
