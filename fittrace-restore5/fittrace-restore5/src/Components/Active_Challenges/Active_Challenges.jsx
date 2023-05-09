import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AdminActiveChallenges from "../../AdminComponents/Admin_Active_Challenges/AdminActiveChallenges";
import Header from "../Header/Header";
import './active_challenges.css';
import DailyTracker from "./DailyTracker";


const Active_Challenges = () => {

  const [data, setData] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'))
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  const isAdmin = (userData.admin === 1)
  const [page, setPage] = useState(0);

  const cardsPerPage = 3;
  const totalCards = data.filter((challenge) => challenge.challenge_status === 'Active').length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const handleClick = (type) => {
    if (type === "prev") {
      setPage((prevPage) => prevPage - 1);
    } else if (type === "next") {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
          if(isLoggedIn && isAdmin){
            return(
              <div>
                <AdminActiveChallenges />
              </div>
            )
          }
          else if(isLoggedIn && !isAdmin){
          return((localStorage.getItem('isLoggedIn'))) ? (
          
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
                            <button className="btn-pink" id = {challenge.challengeid} onClick={()=> handleDailyTracker(challenge.challengeid)}>Daily Tracker</button>
                            
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
                    <div><p>{challenge.description}</p></div>
                    <div>
                      <button className="btn-pinkac" id="btn-pink" name="Accept Challenge" onClick={() => handleAcceptChallenge(challenge.challengeid)}>Accept Challenge</button>
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
    ):(
      <div>
        {
          window.location.replace('/')
        }
      </div>
    );
      }
  };

export default Active_Challenges;
