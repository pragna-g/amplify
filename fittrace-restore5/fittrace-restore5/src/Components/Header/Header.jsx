import React, { useState } from 'react';
import './header.css';
import {FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Header = () => {
    const logout=(e)=>{
        localStorage.clear('user');
        window.location.replace('/')
    }
    return(localStorage.getItem('isLoggedIn'))? (
        <div>
            <div className="navbar">
          <div className="logo">
            <a style={{textDecoration: 'none'}} href="/" >
              <h1 className='fit-trace'>
                FIT <span>TRAcE</span>
              </h1>
            </a>
          </div>
            <div className="navContainer">
                <span ><i class="fa-solid "></i></span>
                <div className="navItems">
                    <a style={{textDecoration: 'none'}} className='navButton' href="/" > <FaHome/> </a>
                    <a style={{textDecoration: 'none'}} className='navButton' href="/" onClick={logout}><FaSignOutAlt /><span className='signout-pos'>Signout</span> </a>
                </div>
                </div>
            </div>
        </div>
        
    ):(
      <div>
         <div className="navbar">
          <div className="logo">
            <a style={{textDecoration: 'none'}} href="/" >
              <h1 className='fit-trace'>
              FIT <span>TRAcE</span>
              </h1>
            </a>
          </div>
          </div>
      </div>
    )
};

export default Header;
