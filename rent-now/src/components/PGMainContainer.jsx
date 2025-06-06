import React, { useEffect, useState } from "react";
import PGCard from "./PGCard";
import axios from "axios";

const PGMainContainer = () => {
  const [pgList, setPgList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2001/getPgData");
        setPgList(response.data); // should be an array of PG documents
      } catch (error) {
        console.error("Error fetching PG data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pg-main-container">
      <div className="heading">
        <h2>Finding best PGs for you</h2>
      </div>
      <div className="best-pg-for-you">
        {pgList.map((pg, index) => (
          <PGCard key={index} pg={pg} />
        ))}
      </div>
    </div>
  );
};

export default PGMainContainer;
