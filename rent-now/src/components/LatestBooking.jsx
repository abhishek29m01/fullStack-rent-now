import React from "react";
import '../css/dashboard.css'
const LatestBooking = () => {
  return (
    <div className="latest-booking-table">
      <table className="latest-bookings">
        <thead>
          <tr>
            <td>S.No</td>
            <td>Booking Id</td>
            <td>Name</td>
            <td>Date</td>
            <td>Price</td>
            <td>Transaction Id</td>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>BID1234</td>
                <td>Abhishek</td>
                <td>02/07/2025</td>
                <td>Rs. 2000</td>
                <td>paytm213454544</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LatestBooking;
