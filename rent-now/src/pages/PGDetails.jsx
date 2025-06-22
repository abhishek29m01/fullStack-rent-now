import React, { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewSection from "../components/ReviewSection";

const PGDetails = () => {
  const { id } = useParams();
  const [pg, setPg] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:2001/getPG/${id}`)
      .then((res) => setPg(res.data))
      .catch((error) => {
        console.error("Failed to fetch PG:", error);
      });
  }, [id]);


  if (!pg) return <p>Loading PG details...</p>;

  return (
    <div className="pg-details">
      <Navbar />
      <div className="pg-card-details">
        <div className="pg-thumbnail-details">
          <div className="img">
            {/* <img src={`http://localhost:2001/${pg.images[0]}`} alt="PG" /> */}
          </div>
        </div>
        <div className="pg-details-details">
          <div className="pg-availability-status">Available</div>
          <h3 className="pg-title">{pg.pgname}</h3>
          <p className="pg-category">
            Type: <b>{pg.pgtype}</b>
          </p>
          <p className="pg-rent">Rent: ₹{pg.rent}</p>
          <p className="pg-owner">
            Owner: <b>{pg.owner}</b>
          </p>
          <p className="pg-contact">Contact: {pg.contact}</p>
          <p className="pg-address">
            Location: {pg.address},  {pg.pincode}
          </p>
          <p className="pg-address">City: {pg.city}</p>
          <p className="pg-category">Category: {pg.category}</p>
          <p className="pg-nearest-college">
            Nearest College: {pg.nearestCollege}
          </p>
          <div className="book-and-more">
            <button className="book-now">Book Now</button>
          </div>
        </div>
      </div>

      {/* rating review  */}
      <ReviewSection pgId={id} userId={""} />
    </div>
  );
};

export default PGDetails;
