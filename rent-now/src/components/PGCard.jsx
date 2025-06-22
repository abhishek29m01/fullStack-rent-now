import React from "react";
import "../css/components.css";
import { useNavigate } from "react-router-dom";

const PGCard = ({ pg }) => {
const navigate=useNavigate();

const handleMoreDetails=()=>{
  navigate(`/pg-details/${pg._id}`);
};
  return (
    <div className="pg-card">
      <div className="pg-thumbnail">
        <div className="img">
          <img src={`http://localhost:2001/${pg.images[0]}`} alt="PG" />
        </div>
      </div>
      <div className="pg-details">
        <div className="pg-availability-status">Available</div>
        <h3 className="pg-title">{pg.pgname}</h3>
        <p className="pg-category">
          Type: <b>{pg.pgtype}</b>
        </p>
        <p className="pg-rent">Rent: ₹{pg.rent}</p>
        {/* <p className="pg-owner">
          Owner: <b>{pg.owner}</b>
        </p> */}
        <p className="pg-contact">Contact: {pg.contact}</p>
        <p className="pg-address">
          Location: {pg.address}, {pg.city}, {pg.pincode}
        </p>
        <p className="pg-category">Category: {pg.category}</p>
        {/* <p className="pg-nearest-college">
          Nearest College: {pg.nearestCollege}
        </p> */}
        <div className="book-and-more">
          <button className="book-now">Book Now</button>
          <button className="more-details" onClick={handleMoreDetails}>More Details</button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
