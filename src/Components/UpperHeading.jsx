import React from 'react'
import './UpperHeading.css'
import { Link } from 'react-router-dom'

const UpperHeading = () => {
  return (
    <div>
        <Link to="/"><h1 className='mt-3 upper-heading'>Welcome To Star Wars Universe</h1></Link>
      
    </div>
  )
}

export default UpperHeading