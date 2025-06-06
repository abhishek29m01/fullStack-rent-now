import React from "react";
import PGCard from "./PGCard";

const PGMainContainer = () => {
  return (
    <div className="pg-main-container">
        <div className="heading">
            <h2>Finding best PGs For you.</h2>
        </div>
      <div className="best-pg-for-you">
        <PGCard />
        <PGCard />
        <PGCard />
        <PGCard />
        <PGCard />
        <PGCard />
        <PGCard />
        <PGCard />
      </div>
    </div>
  );
};

export default PGMainContainer;
