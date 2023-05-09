import React from 'react'
import Home from './Components/Home/Home'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Active_Challenges from './Components/Active_Challenges/Active_Challenges';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ViewProfile from './Components/ViewProfile/ViewProfile';
import UpcomingChallenges from './Components/UpcomingChallenges/UpcomingChallenges';
import DailyTracker from './Components/Active_Challenges/DailyTracker';
import UpdateProfile from './Components/ViewProfile/UpdateProfile';
import UserGuide from './Components/UserGuide/UserGuide';
import AboutUs from './Components/About_Us/AboutUs';
import ReportIssue from './Components/ReportIssue/ReportIssue';
import Feedback from './Components/Feedback/Feedback';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ConfirmPass from './Components/ForgotPassword/ConfirmPass';
import ChallengeStatusBlank from './Components/ChallengeStatus/ChallengeStatusBlank';
const 
App = () => {

  const loggedIn = window.localStorage.getItem('isLoggedIn')
  return (
    <Router>
      <div className='App'>

        <Routes>
          <Route  path='/' Component={loggedIn ? Home : Login}/>
          <Route path='/fit-trace/home' Component={Home}/>
          <Route path='/fit-trace/active-challenges' Component={Active_Challenges} />
          <Route path='/fit-trace/register' Component={Register} />
          <Route path='/fit-trace/view-profile/user-profile' Component={ViewProfile} />
          <Route path='/fit-trace/up-coming-challenges' Component={UpcomingChallenges} />
          <Route path='/fit-trace/daily-tracker' Component={DailyTracker} />
          <Route path='/fit-trace/update-profile' Component={UpdateProfile} />
          <Route path='/fit-trace/user-guide' Component={UserGuide} />
          <Route path='/fit-trace/about-us' Component={AboutUs}/>
          <Route path='/fit-trace/report-issue' Component={ReportIssue} />
          <Route path='/fit-trace/feedback-form' Component={Feedback} />
          <Route path='/forgot-password' Component={ForgotPassword} />
          <Route path='/confirm-password' Component={ConfirmPass} />
          <Route path='/view-profile/challenge-status' Component={ChallengeStatusBlank}/>
        </Routes>

      </div>
    </Router>
  )
}

export default 
App
