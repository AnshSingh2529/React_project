import React from 'react'
import logo_img from '../../images/logo.png'

function Logo() {
  return (
    <div className=' rounded-full shadow-2xl h-10 w-10'><img src={logo_img} alt="logo" /></div>
  )
}

export default Logo