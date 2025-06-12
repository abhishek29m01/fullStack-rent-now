import React from "react";
import "../css/filterbycity.css";
import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import PGMainContainer from "../components/PGMainContainer";

const PgFilterByCity = () => {
  return (
    <div className="filter-by-city">
      <Navbar />
      <Menubar />
      <div className="filter-by-city-container">
        <div className="city-filter">
          <div className="filter-heading">
            <p>Filter PG</p>
          </div>
          <div className="filter-options">
            <form action="">
              <div className="price-filter">
                <div className="input">
                  <label htmlFor="">Min</label>
                  <input type="number" name="" id="" />
                </div>
                <div className="input">
                  <label htmlFor="">Max</label>
                  <input type="number" name="" id="" />
                </div>
              </div>

              <div className="input">
                <label htmlFor="">Category</label>
                <select name="" id="">
                  <option value="girls">Girls</option>
                  <option value="boys">Boys</option>
                </select>
              </div>
              <div className="input">
                <label htmlFor="">City</label>
                <select name="" id="">
                  <option value="">Durg</option>
                  <option value="">Bhilai</option>
                  <option value="">Nehru Nagar</option>
                  <option value="">Smiriti Nagar</option>
                  <option value="">Deepak Nagar</option>
                  <option value="">Hudco</option>
                  <option value="">Supela</option>
                </select>
              </div>
              <div className="input">
                <label htmlFor="">Room Type</label>
                <select name="" id="">
                  <option value="single">Single</option>
                  <option value="sharing">Sharing</option>
                  <option value="pg">PG</option>
                  <option value="rooms">Rooms</option>
                </select>
              </div>

              <button className="apply-filter">Apply Filter</button>
            </form>
          </div>
        </div>
        <div className="filter-by-city-content">
          <div className="pg-search-container">
            <form action="">
              <div className="city-search-input">
                <input type="text" name="" id="" />
                <button className="search-button">Search</button>
              </div>
            </form>
          </div>
          <div className="filter-or-searched-by">
            <PGMainContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgFilterByCity;
