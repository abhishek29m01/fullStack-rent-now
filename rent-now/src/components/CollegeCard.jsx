import React from "react";

const CollegeCard = (props) => {
  return (
    <div className="college-card">
      <div className="college-card-head">
        <div className="college-card-logo">
            <img src="" alt="" />
        </div>
        <div className="college-card-name">
        <h2>{props.college}</h2>
        <p className="f-orange">{props.location}</p>
        </div>
      </div>
      <div className="college-card-content">
        <p>Girls PG:11</p>
        <p>Boys PG:10</p>
      </div>
    </div>
  );
};

export default CollegeCard;
