import React from 'react'
import { Link } from 'react-router-dom'
const Menubar = () => {
  const cities=[
    'all',
    'durg',
    'bhilai',
    'nehru nagar',
    'smriti nagar',
    'supela',
    'hudco',
    'deepak nagar'
  ];
  return (
    <div className='menubar'>
       <ul className="menu-links">
        {cities.map((city,index)=>{
          const url=city==='all'?'/pg-filter':`/pg-filter?city=${encodeURIComponent(city)} `
          return (
            <li key={index}>
              <Link to={url}>{city}</Link>
            </li>
          )
        })}
       </ul>
    </div>
  )
}

export default Menubar

