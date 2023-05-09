import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header';

function AdminActiveChallenges() {
    const [data, setData] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'))
  // const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  // const isAdmin = (userData.admin === 1)

  const [page, setPage] = useState(0);

  const cardsPerPage = 3;
  const totalCards = data.filter((challenge) => challenge.challenge_status === 'Active').length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  // console.log(userData.updates.filter((challengekey) => challengekey.challengekey === 8))
  const handleClick = (type) => {
    if (type === "prev") {
      setPage((prevPage) => prevPage - 1);
    } else if (type === "next") {
      setPage((prevPage) => prevPage + 1);
    }
  };

// to handle delete challenge
const handleDeleteChallenge =(challengeid)=>{
    axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge')
    .then((response) => 
    {
      const challengeData = response.data.response  
      const filteredChallengeData = challengeData.filter(item => item.challengeid === challengeid)
      console.log(filteredChallengeData)
      if(filteredChallengeData.length > 0){
        filteredChallengeData[0].challenge_status = 'Inactive'
        axios.put('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge',filteredChallengeData[0])
        .then((resp)=> console.log(resp.data))
      }
      userData.registered_challenges = userData.registered_challenges.filter(id => id != challengeid)
      userData.updates = userData.updates.filter(date => date.challengekey != (challengeid));
      localStorage.setItem('user',JSON.stringify(userData))
      axios.put('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user', userData)
        .then((resp) => console.log(resp.data))
    }
    
    )
    // window.location.replace('/fit-trace/active-challenges')
    
}

  //to handle the daily tracker
  const handleDailyTracker = (challengeid) =>{
    axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge')
    .then(
      (response) => console.log(challengeid),
      localStorage.setItem('updateForChallenge', challengeid),
    window.location.replace('/fit-trace/daily-tracker')
    )
    
  }
  // To handle Accept Challenges on click
  function handleAcceptChallenge(challengeid){
    // console.log(challengeid) // To check the challengeid on click
    const userData =JSON.parse (localStorage.getItem('user'))
    // console.log(userData)
    localStorage.setItem('datetime', new Date() )
    if (!userData.registered_challenges.includes(parseInt(challengeid))){
      userData.registered_challenges.push(parseInt(challengeid))
      userData.challengeAcceptedDateTime.push(localStorage.getItem('datetime'))
      axios.put('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user', userData)
      .then((response) =>
        { 
        console.log(response.data.body)
        localStorage.setItem('user',JSON.stringify(response.data.body))
        window.location.reload('/fit-trace/active-challenges')
        }
      )
    }
    
  }

useEffect(() => {

    try {
      axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge')
      .then((response) => {
        setData(response.data.response);
      })
      } 
      catch (error) {

          console.error("Error fetching data:", error);

          }

}, []);
return(
          
    <div>
      <Header />
      <center><b><h3 className='ac'>Active Challenges</h3></b></center>
      
  {totalPages >= 1 && (
          <div className="navigation-ac">
            <button className="prev" onClick={() => handleClick("prev")} disabled={page === 0}>&#10094;</button>
            <div className="card-container">
      {
      data
        .filter((challenge) => challenge.challenge_status === 'Active')
        .slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
        .map((challenge) => {
          const userdata = JSON.parse(localStorage.getItem('user'));
          // console.log("admin")
          // console.log(userdata.registered_challenges.includes(challenge.challengeid))
          if (userdata.registered_challenges.includes(parseInt(challenge.challengeid))) {
            // console.log('if executed')
              return (
                <div className="carousel">
                <div key={challenge.challengeid} className='card'>
                  <center>
                    <div className="img-container">
                      <img src={challenge.image[0]} alt='' height={100} />
                    </div>
                    <div><h4>{challenge.name}</h4></div>
                    <div><p>{challenge.description}</p></div>
                    <div>
                      <button className="btn-pink" id = {challenge.challengeid} onClick={()=> handleDailyTracker(challenge.challengeid)}>Daily Tracker</button><br />
                      <button className="btn-red" onClick={()=>handleDeleteChallenge(challenge.challengeid)}>Delete Challenge</button><br />
                      <button className="btn-green">Update Challenge</button>
                    </div>
                  </center>
                </div>
                </div>
              );

      } else {
        // console.log('else executed')
        return (
          <div className="carousel">
          <div key={challenge.challengeid} className='card'>
            <center>
              <div className="img-container">
                <img src={challenge.image[0]} alt='' height={100} />
              </div>
              <div><h4>{challenge.name}</h4></div>
              <div><center><p>{challenge.description}</p></center></div>
              <div>
                <button className="btn-pinkac" id="btn-pink" name="Accept Challenge" onClick={() => handleAcceptChallenge(challenge.challengeid)}>Accept Challenge</button><br />
                <button className="btn-red" onClick={()=> handleDeleteChallenge(challenge.challengeid)}>Delete Challenge</button><br />
                <button className="btn-green">Update Challenge</button>
              </div>
            </center>
          </div>
          </div>
        );
        
      }
    
    }
  
    )
  }
  </div>
            <button className="next" onClick={() => handleClick("next")} disabled={page === totalPages - 1}>&#10095;</button>
          </div>
          
        )}
</div>

)
}

export default AdminActiveChallenges