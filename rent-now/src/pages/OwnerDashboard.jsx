import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faPlus,
  faPenToSquare,
  faTrash,
  faCartShopping,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import DashboardMenu from "../components/DashboardMenu";
import DashboardStatisticsCard from "../components/DashboardStatisticsCard";
import LatestBooking from "../components/LatestBooking";
import axios from "axios";

const OwnerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [pg, setPg] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // getting PG information
  useEffect(() => {
    if (!userInfo._id) return;

    const fetchPgInfo = async () => {
      try {
        const response = await axios.post("http://localhost:2001/getPGsByOwner", {
          userId: userInfo._id,
        });

        setPg(response.data[0]);
        console.log("PGs by owner:", response.data[0]);
      } catch (err) {
        console.error("Error fetching PGs:", err);
      }
    };

    fetchPgInfo();
  }, [userInfo._id]);

  // getting logged-in user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:2001/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Token error", error);
      });
  }, []);


  // set initials for the user icon 
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    const first = names[0]?.charAt(0).toUpperCase() || "";
    const last = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
    return first + last;
  };


  //open and close dialog logics for deleting PG
  const openDeleteDialogue = () => {
    if (!pg) {
      alert("No PG to delete");
    } else {
      setShowDeleteDialog(true);
    }
  };

  const handlePgDelete = async () => {
    try {
      await axios.delete(`http://localhost:2001/deletePg/${pg._id}`);
      setPg(null);
      setShowDeleteDialog(false);
      alert("PG deleted successfully");
    } catch (error) {
      console.log("Error while deleting pg", error);
      alert("Failed to delete PG");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-navbar">
        <div className="dashboard-brand">
          <div className="hamburger" onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="tree-bar-line"
            />
          </div>
          <h2>Rent Now</h2>
        </div>
        <div className="dashboard-user">
          <div className="dashboard-user-icon">
            {getInitials(userInfo.username)}
          </div>
          <div className="dashboard-user-name">{userInfo.username}</div>
        </div>
      </div>

      <div className="dashboard-container">
        <DashboardMenu />
        <div className="dashboard-container-content">
          <div className="dashboard-stats-cards">
            <DashboardStatisticsCard
              statsHeading="Booking Request"
              stats="50"
              card_color="dsc-blue"
            />
            <DashboardStatisticsCard
              statsHeading="Confirmed Booking"
              stats="30"
              card_color="dsc-yellow"
            />
            <DashboardStatisticsCard
              statsHeading="Available Rooms"
              stats="2"
              card_color="dsc-green"
            />
          </div>

          <div className="admin-pg-functionality">
            <Link to="/addnewpg">
              <button className="f-button">
                <FontAwesomeIcon icon={faPlus} className="icon-green" />
                ADD PG
              </button>
            </Link>

            <Link
              to={pg ? `/pgEdit/update/${pg._id}` : "#"}
              onClick={(e) => {
                if (!pg) {
                  e.preventDefault();
                  alert("No PG to update");
                }
              }}
            >
              <button className="f-button ">
                <FontAwesomeIcon icon={faPenToSquare} className="icon-yellow" />
                UPDATE PG
              </button>
            </Link>

            <button className="f-button" onClick={openDeleteDialogue}>
              <FontAwesomeIcon icon={faTrash} className="icon-red" />
              DELETE PG
            </button>

            <Link to="">
              <button className="f-button">
                <FontAwesomeIcon icon={faWallet} className="icon-yellow" />
                PAYMENT HISTORY
              </button>
            </Link>
            <Link to="">
              <button className="f-button">
                <FontAwesomeIcon icon={faCartShopping} className="icon-blue" />
                BOOKING HISTORY
              </button>
            </Link>
          </div>

          {showDeleteDialog && (
            <div className="dialog-overlay">
              <div className="dialog-box">
                <p>Are you sure you want to delete this PG?</p>
                <div className="dialog-buttons">
                  <button onClick={handlePgDelete} className="confirm-btn">Yes, Delete</button>
                  <button onClick={handleCancelDelete} className="cancel-btn">Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="my-pg-details">
            <div className="my-pg-heading">
              <h3>PG/ROOM INFORMATIONS</h3>
            </div>
            {pg ? (
              <div className="my-pg-information">
                <p className="mypg-name"><strong>PG Name: </strong>{pg.pgname}</p>
                <p className="mypg-type"><strong>PG Type: </strong>{pg.pgtype}</p>
                <p className="mypg-owner"><strong>Owner: </strong>{pg.owner}</p>
                <p className="mypg-contact"><strong>Contact: </strong>{pg.contact}</p>
                <p className="mypg-city"><strong>City: </strong>{pg.city}</p>
                <p className="mypg-address"><strong>Address: </strong>{pg.address}</p>
                <p className="mypg-rent"><strong>Rent: </strong>{pg.rent}</p>
                <p className="mypg-pincode"><strong>Pincode: </strong>{pg.pincode}</p>
                <p className="mypg-category"><strong>Category: </strong>{pg.category}</p>
                <p className="mypg-nearestCollege"><strong>Nearest College: </strong>{pg.nearestCollege}</p>
                <p className="mypg-images">Images: link</p>
              </div>
            ) : (
              <p
                style={{
                  margin: "20px auto",
                  fontStyle: "italic",
                  color: "gray",
                  textAlign: "center",
                }}
              >
                You haven’t added any PG yet.
              </p>
            )}
          </div>

          <div className="latest-pg-booking">
            <h3>LATEST BOOKING</h3>
            <LatestBooking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
