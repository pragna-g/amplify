import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './UserGuide.css'

function UserGuide() {
  const userName = JSON.parse(localStorage.getItem('user')).empName
  return(localStorage.getItem('isLoggedIn'))? (
    <div className='user-bg'>
        <Header />
        <center><h3 className='ug'><b>User Guide</b></h3></center>  
        <div className="user-guide">
      <h1>User Guide</h1>
      <p>
        Hello, {userName} !! Welcome to 'FIT TRAcE' web application, I am here to guide you about this application.
        <p>Please go through the details below to have better understanding.</p>
      </p>
      <h2>Getting Started</h2>
      <p>
        FIT TRAcE application help you to stay 'FIT' and 'Healthy' and to track your day to day activities.
      </p>
      <h3>Components used </h3>
      <ul>
        <li>Active Challenges</li>
        <li>Upcoming Challenges</li>
        <li>View Profile</li>
        <li>About Us</li>
        <li>Report Issue</li>
        <li>Feedback</li>
      </ul>
      <h2>Using the Application</h2>
      <p>
        Active Challenges - It will show you the challenges that are active for now and you can accept the challenges and can update the daily tracker to track your daily progress 
      </p>
      <p>
        Upcoming Challenges - It will show you the Inactive/Upcoming challenges that you can access them at later point of time.
      </p>
      <p>
        View Profile - It is used to show your data and the challenges you have been registered and status of the challenges you registered 
      </p>
      <h2>Troubleshooting</h2>
      <p>
        If you face any issue , feel free to contact us by using 
         -- Report Issue
         -- Submit feedback
      </p>
    </div>
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

export default UserGuide

