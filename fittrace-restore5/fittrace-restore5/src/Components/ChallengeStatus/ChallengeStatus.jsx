import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './ChallengeStatus.css'
function ChallengeStatus() {
  const userData = JSON.parse(localStorage.getItem('user'))
  // const filteredData = userData.updates.filter((id)=> id.challengekey === 4)
  const [challenges, setChallenges] = useState([])
  const handleChallengeStatus=(challengeid)=>{
    console.log(challengeid)
    localStorage.setItem('currentChallengeId',challengeid )
  }
  axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge')
  .then(resp => setChallenges(resp.data.response))
  // console.log(challenges)
  return (
    <div>
        <center><h4>Challenge Status</h4></center>
        {/* <Link to='/challenge-status'></Link> */}
        <table className='challenge-status'>
          <thead>
            <tr>
              <th><b>Accepted Challenge</b></th>
              <th style={{paddingLeft:'20px'}}><b>Check Status</b></th>
            </tr>
          </thead>
          <tbody>
        {
          challenges.map((challenge)=>{
            if (userData.registered_challenges.includes(parseInt(challenge.challengeid))){
              return (
                
                  <tr key={challenge.challengeid}>
                      <td  ><a className='cs'>{challenge.name}</a></td>
                      <td  ><a className='cs' href="/view-profile/challenge-status" onClick={()=> handleChallengeStatus(challenge.challengeid)}>Check</a></td>
                  </tr>
            );
            }
          })
}
        </tbody>
        </table>
    </div>
  )
}

export default ChallengeStatus