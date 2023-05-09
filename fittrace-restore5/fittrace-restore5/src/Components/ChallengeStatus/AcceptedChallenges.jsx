import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ChallengeStatus.css'
function AcceptedChallenges() {
   
    const [challengeData , setChallengeData] = useState([]);
        axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge')
        .then((response) => {
            setChallengeData(response.data.response);
            
          })
    
  return (
    <div>
        <div className='card-profile'>
    <center><h4 className='td'>Challenges Accepted</h4></center>
    <table>
      <thead>
        <tr>
          <th>Accepted Challenges</th>
          <th>Fitness Points Earned</th>
          <th>Date of Registration</th>
        </tr>
      </thead>
      <tbody>
        {challengeData.map((challenges) => 
            {
                const userData = JSON.parse(localStorage.getItem('user'));
                let count =0;
                userData.updates.forEach((dateFinder)=>{
                  if(dateFinder.challengekey === parseInt(challenges.challengeid)){
                      count++
                  }
              })
                if (userData.registered_challenges.includes(parseInt(challenges.challengeid))) {
                    const acceptedChallengeIndex = userData.registered_challenges.indexOf(parseInt(challenges.challengeid));
                    return (
                        <tr key={challenges.challengeid}>
                            <td>{challenges.name}</td>
                            <td>{count*5}</td>
                            <td>{userData.challengeAcceptedDateTime[acceptedChallengeIndex]}</td>
                        </tr>
                    );
                }
            })
        }

      </tbody>
    </table>
  </div>
    </div>
  )
}

export default AcceptedChallenges