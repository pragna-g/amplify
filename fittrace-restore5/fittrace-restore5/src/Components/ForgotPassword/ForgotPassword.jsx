import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Header from '../Header/Header';

function ForgotPassword() {
    const [emailId, setEmailid] = useState('');
    const [data, setData] = useState([]);
    localStorage.setItem('allUsers',JSON.stringify(data))
   const handleForgotPass=(e)=>{
        e.preventDefault();
        axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user')
        .then((response)=>{
            setData(response.data.response) 
            data.filter((res)=>{
                if(res.emailId===emailId){
                    const curEmpId = localStorage.setItem('curEmpId',JSON.parse(res.employeeid))
                    window.location.replace('/confirm-password')
                }
            })
        })
    }
  return (
    <div className='forgot-pass'>
        <Header />
      <form onSubmit={handleForgotPass}>
        <div className="card">
          <center><h1 className='forgot'>Forgot Password</h1></center>
          <label htmlFor="Emailid">Email Id :</label>
          <div><input type="email"
             placeholder='Email Id'
             value={emailId}
             onChange={(e) =>
                setEmailid(e.target.value)
             } /></div>
            <br />
            <br />
            <div>
                <button className='btn-primary' type='submit'>Submit</button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default ForgotPassword