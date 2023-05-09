import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './ReportIssue.css'
function ReportIssue() {
  return(localStorage.getItem('isLoggedIn'))? (
    <div>
        <Header />
        <center><h3 className='ri'><b>Report An Issue</b></h3></center>
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

export default ReportIssue
