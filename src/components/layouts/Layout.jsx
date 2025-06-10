import React from 'react'

function Layout (props) {
  /*de-structuring props (by children) to show child elements present in App.jsx over Layout's content*/
  const { children } = props
  console.log('children', children)

  return (
    <>
      {/**rendering the children coming from App.jsx on top of Layout content */}
      <header>
        <h1 className='text-gradient'>Ani-Dex</h1>
      </header>
      <main>{children}</main>

      <footer>
        <small>Created By</small>
        <a href='https://github.com/maanasnandu' target='_blank'>
          <img
            src='https://avatars.githubusercontent.com/u/48630102?v=4'
            alt='pfp'
          />
          <p>Maanas Muddam</p>
          <i className='fa-brands fa-github-alt'></i>
        </a>

        <small>Follow Me!</small>
        <a href='https://www.instagram.com/msn.omdlensman/' target='_blank'>
          <img
            src='https://itsmaanas.netlify.app/assets/hero-img-qXm_lMq0.png'
            alt='pfp'
          />

          <i className='fa-brands fa-square-instagram'></i>
        </a>
      </footer>
    </>
  )
}

export default Layout
