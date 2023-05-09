import React, { useEffect } from 'react'
import axios from 'axios'
import { FaHome } from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import './Register.css';
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie';
import Header from '../Header/Header';


function Register () {
    
    const [admin, setAdmin] = useState(0);
    const [employeeid , setEmployeeId] = useState('');
    const [empName, setEmpName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobile, setMobile] = useState('');
    const [empHeight, setEmpHeight] = useState('');
    const [empWeight, setEmpWeight] = useState('');
    const [empFitnessFocus, setEmpFitnessFocus] = useState('');
    const [empFitnessGoal, setEmpFitnessGoal] = useState('');
    const [empFitnessMantra, setEmpFitnessMantra] = useState('');
    const [password , setPassword] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const hashpass = bcrypt.hashSync(password)
     localStorage.setItem('allUsers', (axios.get('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/user?key='+employeeid)).then((resp)=>{
        const usersData =resp.data.response
        setAllUsers(usersData)
    }))
const handleSubmit = (e) =>{
    e.preventDefault();
    const createUserJSON = {
        admin : 0,
        emailId: emailId,
        employeeid: employeeid,
        empName: empName,
        mobile: mobile,
        // empAccount: empAccount,
        empHeight: empHeight,
        empWeight: empWeight,
        empFitnessGoal: empFitnessGoal,
        empFitnessFocus: empFitnessFocus,
        empFitnessMantra: empFitnessMantra,
        password: hashpass,
        registered_challenges: [],
        challengeAcceptedDateTime: [],
        updates: []
      }
      axios.get('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user').then((data)=>
    {
      const dataRes = data.data.response
      const userData=dataRes.filter(email => email.emailId === emailId)
        if(userData.length ===0){
            axios.post('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user', createUserJSON)
            .then((res)=>{
                if(res.status === 200){
                const resRegUser = res.data;
                alert("Registration Successfull")
                window.location.replace('/')
                }   
            });
        }
        else{
            if(userData[0].emailId === emailId){
                alert('Email Id already registered')
                window.location.replace('/')
            }
            else{
                axios.post('https://kfjuuv94uk.execute-api.ap-south-1.amazonaws.com/terraform/user', createUserJSON)
                .then((res)=>{
                    if(res.status === 200){
                        const resRegUser = res.data;
                        alert("Registration Successfull")
                    }
                });
            }
        }
      
    }
    )
}
   
return (
    <div>
        <Header />
        <center>
            <div className='card-r'>
            <form onSubmit={handleSubmit}>
            <center><h1 className='register'>Register</h1></center>
                <div className="container">
                <div className="left">
                    {/* employee id input field */}
                    <label htmlFor='employeeId'>Employee ID :</label><br />
                    <input 
                        type='text'
                        name='Employee ID' 
                        placeholder='Employee ID' 
                        value={employeeid} 
                        onChange={(e) =>
                            {
                                const empid = e.target.value
                                if(/^[0-9]*$/.test(empid)){
                                    setEmployeeId(empid)
                                }
                            }
                        }
                        required/><br /><br />
                    {/* password input field */}
                    <label htmlFor='password'> Password :</label><br />
                    <input 
                        type='password'
                        name='password' 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required/><br /><br />
                    {/* input element for employee name */}
                    <label htmlFor='employeeName'>Employee Name :</label><br />
                    <input type='text'
                        name='Employee Name'
                        placeholder='Employee Name'
                        value={empName}
                        onChange={(e) =>
                            {
                                const name = e.target.value
                                if(/^[a-zA-Z\s]*$/.test(name)){
                                    setEmpName(name);
                                }
                                
                            }
                        }
                            required /> <br /><br/>
                    {/* input element for emailid */}
                    <label htmlFor='emailId'>Email ID :</label><br />
                    <input type='text'
                    name='Email ID'
                    placeholder='Email ID'
                    value={emailId}
                    onChange={(e) =>
                        {
                            const email = e.target.value
                            
                                setEmailId(email);
                            
                            
                        }
                    }
                    required /> <br/><br />
                    {/* input field for employee mobile */}
                    <label htmlFor='employeeMobile'>Employee Mobile </label><br />
                    <input type='tel'
                    name='Mobile Number'
                    pattern='[0-9]{10}'
                    placeholder='Employee Mobile'
                    value={mobile}
                    onChange = {(e)=>{
                        const mobileNumber = e.target.value;
                        if (/^\d{0,10}$/.test(mobileNumber)) {
                        setMobile(mobileNumber);
                        }
                        
                    }
                }
                    required /><br /><br />
                    </div >
                    {/* input element for employee height */}
                    <div className='right'>

                    <label htmlFor='height' >Height (Cms)</label><br />
                    <input type='number'
                    name='Height'
                    placeholder='Height (in Cms)'
                    value={empHeight}
                    onChange = {(e) =>
                        {
                            const height = e.target.value
                            if(/^\d{0,3}$/.test(height)){
                                setEmpHeight(height)
                            }
                        
                        }
                    }
                    required /><br /><br />
                    {/* input field for employee weight */}
                    <label htmlFor='weight'>Weight (Kgs)</label><br />
                    <input type='number'
                    name='Weight'
                    placeholder='Weight (in Kgs)'
                    value={empWeight}
                    onChange ={(e)=>
                        {
                            const weight = e.target.value
                            if(/^\d{0,3}$/.test(weight)){
                                setEmpWeight(weight)
                            }
                            
                        }
                    }
                    required/><br /><br />
                    {/* input field for fitness goal */}
                    <label htmlFor='fitnessGoals'>Fitness Goals</label><br />
                    <input type='text'
                    name = 'Fitness Goals'
                    placeholder='Fitness Goals'
                    value={empFitnessGoal}
                    onChange={(e)=>
                        {
                            const fitnessGoal = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(fitnessGoal)) {
                                setEmpFitnessGoal(fitnessGoal);
                            }
                            
                        }
                    }
                    /><br /><br />
                    {/* input field for fitness focus */}
                    <label htmlFor='fitnessFocus'>Fitness Focus</label><br />
                    <input type='text'
                    name='Fitness Focuss'
                    placeholder='Fitness Focus'
                    value={empFitnessFocus}
                    onChange={(e)=>
                        {
                            const fitnessFocus = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(fitnessFocus)) {
                                setEmpFitnessFocus(fitnessFocus);
                            }
                        
                        }
                    }
                    ></input><br /><br />
                    {/* input field for fitness mantra */}
                    <label htmlFor='fitnessMantra'>Fitness Mantra</label><br />
                    <input type='Fitness Mantra'
                    placeholder='Fitness Mantra'
                    value={empFitnessMantra}
                    onChange={(e) =>
                        {
                            const fitnessMantra = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(fitnessMantra)) {
                                setEmpFitnessMantra(fitnessMantra);
                            }
                            
                        }
                    }></input><br /><br />
                    </div>{/* close of div with classname = right */}
                    </div>
                    <center>
                        <button type='submit' >Submit</button>
                    </center>
            </form>
        </div>
        </center>
    </div>
    
  )
}

export default Register