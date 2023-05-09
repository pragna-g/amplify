import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import './Login.css'
import Header from '../Header/Header'

function Login() {
    const [employeeid , setEmployeeid ] = useState('');
    const [emailId, setEmailId] = useState('')
    const [password , setPassword] = useState('');
    const handleLogin =(e)=>{
        e.preventDefault();
        axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user'/*?key=+employeeid*/)
        .then(
            (response) =>{
                 const datares = response.data;
                 console.log(datares)
                const empid = datares.response.filter((email) => email.emailId === emailId)[0].employeeid
                console.log(empid)
                localStorage.setItem('employeeid',empid)
                axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user?employeeid='+empid)
                .then(
                    (response) =>{
                         const datares = response.data;
                         console.log(datares)
                           if(bcrypt.compareSync(password, datares.response.password)){
                           localStorage.setItem('user', JSON.stringify(datares.response) )
                           localStorage.setItem('employeeid',parseInt(datares.response.employeeid))
                           console.log(localStorage.getItem('employeeid'))
                           // console.log(localStorage.getItem('user'))
                           window.localStorage.setItem('isLoggedIn',true)
                           window.location.href='/fit-trace/home';
                 }
                 else{
                    alert("Incorrect Username/ Password")
                 }
                       
                    }
                )
            }
        )
        
        
    }
  return (
      <div className='login'>
        <Header />
      <form onSubmit={handleLogin}>
        <div className="card">
          <center><h1 className='login'>Login</h1></center>
          <label htmlFor="Employee Id">Email Id :</label>
          <div><input type="email"
             placeholder='Email Id'
             value={emailId}
             onChange={(e) =>
                setEmailId(e.target.value)
             } /></div>
            <br />
            <label htmlFor="Password">Password :</label>
            <div>
            <input type="password" 
             placeholder='Password'
             value={password}
             onChange ={(e) => 
                setPassword(e.target.value)
             } />
            </div>
            <br />
            <div>
                <button className='btn-primary' type='submit'>Log In</button>
                <a href="/forgot-password" style={{textDecoration:'underline', color:"blue",alignItems:'right'}}>forgot password?</a>
                <p>
                    Don't have an account?
                </p>
                <a className='btn'href="/fit-trace/register" style={{textDecoration:'underline', color:"blue"}}>Register </a>
            </div>
        </div>
        </form>
    </div>
  )
}

export default Login