import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menubar from "./Menubar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import '../css/components.css'
import UserLocation from "./UserLocation";

const Navbar = () => {
  const[isOpen,setIsOpen]=useState(false);
  const toggleMenu=()=>{
    setIsOpen(!isOpen);
  };
  return (
    <div className="navbar">
      
      <div className="logo">
        <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="tree-bar-line" />
      </div>
        <h2>RENT NOW</h2>
        <UserLocation/>
      </div>
      <div className="navbar-links">
          <ul className={`nav-links ${isOpen ? "open" : "" }`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
          <li>
            <Link to="/">FAQs</Link>
          </li>
          <li>
            <Link to="/">Category</Link>
          </li>
        </ul>
        <div className="login-signup">
          <Link to={"/signup"} className="sign-up">Sign up</Link>
          <button><Link to={'/login'}>Login</Link></button>
        </div>
      </div>
    </div>
    
  );
};

export default Navbar;
