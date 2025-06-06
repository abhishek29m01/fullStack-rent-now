import React from 'react'
import "../css/components.css"
const PGCard = () => {
  return (
    <div className='pg-card'>
        <div className="pg-thumbnail">
            <div className="img">
              <img src="/banner-1.jpg" alt="" />
            </div>
        </div>
        <div className="pg-details">
            <div className="pg-availability-status">Available</div>
            <h3 className="pg-title">John's PG</h3>
            <p className='pg-category'>for: <b>GIRLS</b></p>
            <p className="pg-rent">Rent:2000 p/m</p>
            <p className='pg-owner'>Owner: <b>Name</b></p>
            <p className="pg-contact">Contact: 7879944097</p>
            <p className="pg-address">Location:Street no:2, Nehru Nagar, Bhilai, Durg chhattisgarh 49009</p>
            <div className="book-and-more">
                <button className="book-now">Book Now</button>
                <button className="more-details">More Details</button>
            </div>

        </div>
      
    </div>
  )
}

export default PGCard
