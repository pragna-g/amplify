import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './UpcomingChallenges.css'
import AdminUpcomingChallenges from "../../AdminComponents/Admin_Upcoming_Challenges/AdminUpcomingChallenges";

function UpcomingChallenges() {
  const [inactivedata, setInactiveData] = useState([]);
  const [page, setPage] = useState(0);
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  const userData = JSON.parse(localStorage.getItem('user'))
  const isAdmin = (userData.admin === 1)

  const cardsPerPage = 3;
  const totalCards = inactivedata.filter((challenge) => challenge.challenge_status === 'Inactive').length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

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
  if(isLoggedIn && isAdmin){
    return(
      <div>
        <AdminUpcomingChallenges />
      </div>
    )
  }
  else if(isLoggedIn && !isAdmin){

  return(localStorage.getItem('isLoggedIn')) ? (
    <div>
      <Header />
      <center><b><h3 className='uc'>Upcoming Challenges</h3></b></center>
      
        {totalPages > 1 && (
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
              </center>
            </div>
            </div>
          ))}
          </div>
            <button className="next" onClick={() => handleClick("next")} disabled={page === totalPages - 1} >&#10095;</button>
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
}

export default UpcomingChallenges;
