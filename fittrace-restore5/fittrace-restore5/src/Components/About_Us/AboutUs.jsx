import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './About-Us.css'
function AboutUs() {
  return(localStorage.getItem('isLoggedIn'))? (
    <div>
      <Header />
        <center><b><h3 className='ab' >About Us</h3></b></center>  
        <div >
          <div className='abus'>
          <p>Welcome to 'FIT TRAcE' web application</p>
        <p>
        FIT TRAcE application help you to stay 'FIT' and 'Healthy' and to track your day to day activities.
      </p>
          </div>
    </div> 
    </div>
  ) :
  (
    <div>
      {
        window.location.replace('/')
      }
    </div>    
  )
}

export default AboutUs