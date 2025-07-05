import React from 'react'
import '../css/dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faBell,faGear,faRightFromBracket,faUser } from '@fortawesome/free-solid-svg-icons';

const DashboardMenu = () => {
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.clear();
    // navigate("/login");
  }

  return (
    <div className='dashboard-menu'>
      <div className="dashboard-header">Dashboard</div>
      <div className="dashboard-menu-links">
        <Link to="/"><FontAwesomeIcon icon={faHouse} className='menu-icon-color'/>Home</Link>
        <Link to=""><FontAwesomeIcon icon={faUser} className='menu-icon-color' />Profile</Link>
        <Link><FontAwesomeIcon icon={faGear} className='menu-icon-color' />Setting</Link>
        <Link to="" className='notification'><FontAwesomeIcon icon={faBell} className='menu-icon-color' />Notification
            <div className="notification-icon">2</div>
        </Link>
        <Link to="/login" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className='menu-icon-color' />Logout</Link>
      </div>
    </div>
  )
}

export default DashboardMenu
