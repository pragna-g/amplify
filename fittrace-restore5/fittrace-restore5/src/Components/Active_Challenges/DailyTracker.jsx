import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './DailyTracker.css'
function DailyTracker() {
    const navigate = useNavigate()
    const [date , setDate] = useState('')
    const [dayStatus, setStatus] = useState('')
    var userData = JSON.parse(localStorage.getItem('user'))
    const challengeId = parseInt(localStorage.getItem('updateForChallenge'))
    const dailyTracker = async() =>{
        console.log(localStorage.getItem('updateForChallenge'))
        const challengeId = parseInt(localStorage.getItem('updateForChallenge'))
        let isDuplicateDate = false
        userData.updates.forEach((dateFinder)=>{
            if(dateFinder.challengekey === challengeId && dateFinder.date === date){
                isDuplicateDate = true
                alert("You have already submitted the status for this date!")
                navigate('/fit-trace/active-challenges')
            }
        })
        if(!isDuplicateDate){
            const updateTrackerJSON={
                "challengekey" : challengeId,
                "date" : date,
                "status" : dayStatus
            }
            userData.updates.push(updateTrackerJSON)
            axios.post('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user',userData)
                .then((response) =>
                {
                    console.log(response.data)
                    localStorage.setItem('user',JSON.stringify(response.data.body))
                    window.location.href=('/fit-trace/active-challenges')
                })
                navigate('/fit-trace/active-challenges')
        }
    }
    
    
  return(localStorage.getItem('isLoggedIn'))? (
    <div>
        <Header />
    <div className='cards-daily'>
        <div className='daily-input'>
        <center>
        <h3>Daily Tracker</h3>
        <h5>{}</h5>
        </center>
        <div >
            <form onSubmit={dailyTracker}>
                
                <label htmlFor="date">Date :</label>
                <input type="date"
                    placeholder='Todays date' 
                    value={date} 
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                />
                <label htmlFor="status">Status :</label>
                <input type="text" 
                    placeholder="Today's Status"
                    value={dayStatus}
                    onChange={(e)=>
                    setStatus(e.target.value)
                    }
                />
                <button type='submit' >Submit</button>
            </form>
        </div>
    </div>
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

export default DailyTracker
