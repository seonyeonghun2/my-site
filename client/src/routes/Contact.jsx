import React from 'react'
import { useNavigate } from 'react-router'

function Contact() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/contact/write')
  }
  return (    
    <div className="w-7xl mx-auto my-5">
      <div className="featured-title text-3xl font-bold my-3 flex justify-between">
        Contact <button className="btn btn-outline btn-primary" onClick={handleClick}>Write</button>
      </div>
    </div>
  )
}

export default Contact