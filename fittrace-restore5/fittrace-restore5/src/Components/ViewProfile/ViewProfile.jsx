import React from 'react'
import {useNavigate} from 'react-router-dom'
import AcceptedChallenges from '../ChallengeStatus/AcceptedChallenges';
import ChallengeStatus from '../ChallengeStatus/ChallengeStatus';
import Header from '../Header/Header';
import './ViewProfile.css'

function ViewProfile() {
    function updateProfile(){
        window.location.replace('/fit-trace/update-profile')
    }
    const userProfileData = JSON.parse(localStorage.getItem('user'));
    
  return(localStorage.getItem('isLoggedIn'))? (
    <div className='view-bg'>
      <Header />
      <center><h3 className="vp"><b>View Profile</b></h3></center>
      <div className="card-container-view">
        <table className='profile'>
          <thead>
            <tr>
              <th><b>Employee ID</b></th>
              <th><b>Employee Name</b></th>
              <th><b>Fitness Goal</b></th>
              <th><b>Fitness Mantra</b></th>
              <th><b>Height(Cms)</b></th>
              <th><b>Weight(Kgs)</b></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userProfileData.employeeid}</td>
              <td>{userProfileData.empName}</td>
              <td>{userProfileData.empFitnessGoal}</td>
              <td>{userProfileData.empFitnessMantra}</td>
              <td>{userProfileData.empHeight}</td>
              <td>{userProfileData.empWeight}</td>
            </tr>
          </tbody>
        </table>
    
      </div>
      <div className='update-btn'><button onClick={updateProfile} >Update</button></div>
      <span></span>
      <div>
        <AcceptedChallenges />
      </div>
      <div className='card-profile-cs'>
        <ChallengeStatus />
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

export default ViewProfile