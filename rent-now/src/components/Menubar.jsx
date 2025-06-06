import React from 'react'
import { Link } from 'react-router-dom'
const Menubar = () => {
  return (
    <div className='menubar'>
        <ul className="menu-links">
           <li><Link>All</Link></li>
           <li><Link>Durg</Link></li>
           <li><Link>Bhilai</Link></li>
           <li><Link>Smiriti Nagar</Link></li>
           <li><Link>Nehru Nagar</Link></li>
           <li><Link>Supela</Link></li>
           <li><Link>All</Link></li>
           <li><Link>All</Link></li>
        </ul>
    </div>
  )
}

export default Menubar
