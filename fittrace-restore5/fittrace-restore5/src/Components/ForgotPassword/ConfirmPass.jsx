import React from 'react'
import { useState } from 'react'
import Header from '../Header/Header'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ConfirmPass() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeid'))
    const hashPass = bcrypt.hashSync(password)
    const navigate = useNavigate()
    const handleForgotPass=(e)=>{
        e.preventDefault()
        if(password === confirmPassword){
            const resetPassJSON={
                password : hashPass
            }
            axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user?employeeid='+employeeId)
            .then((response)=>{
                const userData = response.data.response
                userData.password=hashPass
            axios.put('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user?employeeid='+employeeId,userData)
            .then((res)=>{
                    // if(res.statusCode === 200){
                    //     navigate('/')
                    // }
                    window.location.replace('/')
            })
        })
        }
        else{
            alert('Passmismatch')
        }
    }
  return (
    <div className='forgot-pass'>
        <Header />
      <form onSubmit={handleForgotPass}>
        <div className="card">
          <center><h1 className='forgot'>Forgot Password</h1></center>
          <label htmlFor="Employeeid">Employee Id :</label>
          <div><input type="text"
             placeholder='Employee Id'
             value={employeeId}
             /></div>
            
          <label htmlFor="Password">Password :</label>
          <div><input type="password"
             placeholder='password'
             value={password}
             onChange={(e) =>
                setPassword(e.target.value)
             } /></div>
            
            <label htmlFor="Password">Confirm Password :</label>
          <div><input type="password"
             placeholder='password'
             value={confirmPassword}
             onChange={(e) =>
                setConfirmPassword(e.target.value)
             } /></div>
            
            <div>
                <button className='btn-primary' type='submit'>Submit</button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default ConfirmPass