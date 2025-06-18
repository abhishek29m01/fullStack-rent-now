import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/filterbycity.css";
import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import PGCard from "../components/PGCard";

const PgFilterByCity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pgs, setPgs] = useState([]);
  const [allPgs, setAllPgs] = useState([]); // holds full list
  const [searchQuery, setSearchQuery] = useState("");

  // Get filters from URL
  const getFiltersFromURL = () => {
    const params = new URLSearchParams(location.search);
    return {
      city: params.get("city") || "",
      min: params.get("min") || "",
      max: params.get("max") || "",
      category: params.get("category") || "",
      roomType: params.get("roomType") || "",
      search:params.get("search")|| "",
    };
  };

  const [formFilters, setFormFilters] = useState(getFiltersFromURL());

  // Handle input change for filters
  const handleInputChange = (e) => {
    setFormFilters({ ...formFilters, [e.target.name]: e.target.value });
  };

  // Handle input change for search
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch PGs on mount or when URL query changes
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const params = getFiltersFromURL();
        const res = await axios.get("http://localhost:2001/filteredPG", {
          params,
        });

        setPgs(res.data);
        setAllPgs(res.data); // backup
      } catch (err) {
        console.error("❌ Error fetching PGs:", err);
      }
    };

    fetchPGs();
  }, [location.search]);

  // Reset pgs to allPgs when search query is cleared
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setPgs(allPgs);
    }
  }, [searchQuery, allPgs]);

  // Search logic
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();

    const filteredPGs = allPgs.filter((pg) => {
      return (
        pg.pgname?.toLowerCase().includes(query) ||
        pg.city?.toLowerCase().includes(query) ||
        pg.category?.toLowerCase().includes(query) ||
        pg.pgtype?.toLowerCase().includes(query) ||
        pg.address?.toLowerCase().includes(query)
      );
    });

    setPgs(filteredPGs);
  };

  // On "Apply Filter"
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(formFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/pg-filter?${params.toString()}`);
  };

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
            <form onSubmit={handleFilterSubmit}>
              <div className="price-filter">
                <div className="input">
                  <label>Min</label>
                  <input
                    type="number"
                    name="min"
                    value={formFilters.min}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label>Max</label>
                  <input
                    type="number"
                    name="max"
                    value={formFilters.max}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="input">
                <label>Category</label>
                <select
                  name="category"
                  value={formFilters.category}
                  onChange={handleInputChange}
                >
                  <option value="">All</option>
                  <option value="girls">Girls</option>
                  <option value="boys">Boys</option>
                </select>
              </div>

              <div className="input">
                <label>City</label>
                <select
                  name="city"
                  value={formFilters.city}
                  onChange={handleInputChange}
                >
                  <option value="">All</option>
                  <option value="Durg">Durg</option>
                  <option value="Bhilai">Bhilai</option>
                  <option value="Nehru Nagar">Nehru Nagar</option>
                  <option value="Smiriti Nagar">Smiriti Nagar</option>
                  <option value="Deepak Nagar">Deepak Nagar</option>
                  <option value="Hudco">Hudco</option>
                  <option value="Supela">Supela</option>
                </select>
              </div>

              <div className="input">
                <label>Room Type</label>
                <select
                  name="roomType"
                  value={formFilters.roomType}
                  onChange={handleInputChange}
                >
                  <option value="">All</option>
                  <option value="single">Single</option>
                  <option value="sharing">Sharing</option>
                  <option value="pg">PG</option>
                  <option value="rooms">Rooms</option>
                </select>
              </div>

              <button className="apply-filter" type="submit">
                Apply Filter
              </button>
            </form>
          </div>
        </div>

        <div className="filter-by-city-content">
          <div className="pg-search-container">
            <form onSubmit={handleSearch}>
              <div className="city-search-input">
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search PG..."
                />
                <button className="search-button" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="filter-or-searched-by">
            {pgs.length > 0 ? (
              <div className="filtered-pg-list">
                {pgs.map((pg, index) => (
                  <PGCard key={index} pg={pg} />
                ))}
              </div>
            ) : (
              <h2 style={{ textAlign: "center", color: "red", padding: "20px" }}>
                No PG Found
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgFilterByCity;
