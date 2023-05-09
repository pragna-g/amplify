import React from 'react'
import Header from '../Header/Header'
import './ChallengeStatus.css'
function ChallengeStatusBlank() {
    const challengeid = localStorage.getItem('currentChallengeId')
    const userData = JSON.parse(localStorage.getItem('user'))
    const filteredData = userData.updates.filter((id)=> id.challengekey === parseInt(challengeid))
    console.log(filteredData)
  return (
    <div>
        <Header/>
        <table className='card-profile-status'>
            <thead>
                <th>Date</th>
                <th>Status</th>
            </thead>
            <tbody>
                {filteredData.map((items) => {
                    return (
                        <tr key={items.challengekey}>
                        <td>{items.date}</td>
                        <td>{items.status}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ChallengeStatusBlank