import React from 'react'
import { Link } from 'react-router-dom'

const HomeView: React.FC = () => {
  return (
    <div>
      home
      <Link to="/login">login</Link>
    </div>
  )
}

export default HomeView
