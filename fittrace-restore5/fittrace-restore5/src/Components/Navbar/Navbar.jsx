import React from 'react'
import './navbar.css'


const Navbar = () => {

// const logout =(e) =>{
//   e.preventDefault();
//   localStorage.clear(e);
//   window.location.href='/';
// }
  
  return(localStorage.getItem('isLoggedIn'))? (
    <section>
      <header className="header-flex">
          <center>
            <div className="buttonPlace">
              <button className='btn'><a href="/fit-trace/active-challenges" className="navlink">Active Challenges</a></button>
              <button className='btn'><a href="/fit-trace/up-coming-challenges" className="navlink">Upcoming Challenges</a></button>
              <button className='btn'><a href="/fit-trace/user-guide" className="navlink">User Guide</a></button>
              <button className='btn'> <a href="/fit-trace/view-profile/user-profile" className="navlink" >View Profile</a></button>
              <button className='btn'><a href="/fit-trace/about-us" className="navlink">About Us</a></button>
              <button className='btn'><a href="/fit-trace/report-issue" className="navlink">Report Issue</a></button>
              <button className='btn'><a href="/fit-trace/feedback-form" className="navlink">Feedback</a></button>
            </div>
          </center>
      </header>
  </section>

  ):(
    <div>
      {
        window.location.replace('/')
      }
    </div>
  )
}

export default Navbar