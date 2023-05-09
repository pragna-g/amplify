import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';
import './Feedback.css'
function Feedback() {
    const [name, setName] = useState(JSON.parse(localStorage.getItem('user')).empName);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('user')).emailId);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
  }
  return(localStorage.getItem('isLoggedIn'))? (
    <div className='feedback-bg'>
      <Header />
        <div className='cards'>
        <form onSubmit={handleSubmit}>
        <center><h1 className='register'>Feedback</h1></center>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <br />
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  ):(
    <div>
      {
        window.location.replace('/')
      }
    </div>
  )
}

export default Feedback