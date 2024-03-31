import React from 'react'
import logo_img from '../../images/logo.png'

function Logo({width = '100px'}) {
  return (
    <div className=' rounded-lg shadow-2xl h-10 w-10'><img src={logo_img} alt="logo" /></div>
  )
}

export default Logo