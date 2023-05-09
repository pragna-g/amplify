import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import './home.css'
const Home = () => {
  return(localStorage.getItem('isLoggedIn'))? (
    
    <div className='navbar-pos' >
      <Header/>
      
        <Navbar />
      
    </div>

  ):
  (
    <div>
      {
        window.location.replace('/')
      }
    </div>
  )
}

export default Home