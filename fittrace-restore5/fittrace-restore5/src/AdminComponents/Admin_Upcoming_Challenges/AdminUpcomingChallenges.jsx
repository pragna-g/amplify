import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header';

function AdminUpcomingChallenges() {
    const [inactivedata, setInactiveData] = useState([]);
    const [page, setPage] = useState(0);

    const cardsPerPage = 3;
    const totalCards = inactivedata.filter((challenge) => challenge.challenge_status === 'Inactive').length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const handleActivateChallenge =(challengeid)=>{
        axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge')
        .then((response) => 
        {
            const challengeData = response.data.response  
            const filteredChallengeData = challengeData.filter(item => item.challengeid === challengeid)
            console.log(filteredChallengeData)
            if(filteredChallengeData.length > 0){
                filteredChallengeData[0].challenge_status = 'Active'
                axios.put('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge',filteredChallengeData[0])
                .then((resp)=> console.log(resp.data))
            }
        }

        )
    }
  
    const handleClick = (type) => {
      if (type === "prev") {
        setPage((prevPage) => prevPage - 1);
      } else if (type === "next") {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    useEffect(() => {
      try {
        fetch("https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/challenge")
          .then((inactivedata) => inactivedata.json())
          .then((inactivedata) => {
            setInactiveData(inactivedata.response);
          });
  
      } catch (error) {
  
        console.error("Error fetching data:", error);
  
      }
  
    }, []);

    return(localStorage.getItem('isLoggedIn')) ? (
      <div>
        <Header />
        <center><b><h3 className='uc'>Upcoming Challenges</h3></b></center>
       
          {totalPages >= 1 && (
            <div className="navigation">
              <button className="prev" onClick={() => handleClick("prev")} disabled={page === 0}>&#10094;</button>
              <div className="card-container-uc">
          {
          inactivedata
            .filter((challenge) => challenge.challenge_status === 'Inactive')
            .slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
            .map((challenge) => (
              <div className='carousel'>
              <div key={challenge.challengeid} className='card'>
                <center>
                  <div className="img-container">
                    <img src={challenge.image[0]} alt='' height={100} />
                  </div>
                  <div ><h4>{challenge.name}</h4></div>
                  <div ><p>{challenge.description}</p></div>
                  <button className='btn-pink' onClick={()=> handleActivateChallenge(challenge.challengeid)}>Activate Challenge</button>
                </center>
              </div>
              </div>
            ))}
            </div>
              <button className="next" onClick={() => handleClick("next")} disabled={page === totalPages - 1}>&#10095;</button>
            </div>
          )}
      </div>
    ) : (
      <div>
        {
          window.location.replace('/')
        }
      </div>
    );
}

export default AdminUpcomingChallenges