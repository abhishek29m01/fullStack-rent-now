import React from 'react'
import '../css/dashboard.css'

const DashboardStatisticsCard = (dsc) => {
  return (
    <div className={`dashbaord-statistics-card ${dsc.card_color}`}>
        <h2 className="dsc-heading">{dsc.statsHeading}</h2>
        <p className="dsc-count">{dsc.stats}</p>
    </div>
  )
}

export default DashboardStatisticsCard;
