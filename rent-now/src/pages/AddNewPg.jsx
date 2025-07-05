import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/addnewpg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const AddNewPg = ({ isEdit = false, onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pgData, setPgData] = useState({
    pgname: "",
    pgtype: "",
    owner: "",
    contact: "",
    category: "",
    rent: "",
    city: "",
    cityInput: "", // additional state for "Other"
    address: "",
    pincode: "",
    nearestCollege: "",
    images: [],
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setPgData({
        ...pgData,
        images: Array.from(files),
      });
    } else {
      setPgData({
        ...pgData,
        [name]: value,
      });
    }
  };

  //for Edit purpose
  useEffect(() => {
    const fetchData = async () => {
      if (isEdit && id) {
        try {
          const res = await axios.get(`http://localhost:2001/getPgData/${id}`);
          setPgData({
            pgname: res.data.pgname || "",
            pgtype: res.data.pgtype || "",
            owner: res.data.owner || "",
            contact: res.data.contact || "",
            category: res.data.category || "",
            rent: res.data.rent || "",
            city: res.data.city || "",
            cityInput: "", // additional state for "Other"
            address: res.data.address || "",
            pincode: res.data.pincode || "",
            nearestCollege: res.data.nearestCollege || "",
            images:[],
          });
        } catch (error) {
          console.error("Error fetching from data:", error);
        }
      }
    };

    fetchData();
  }, [isEdit, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = [
      "pgname",
      "pgtype",
      "owner",
      "contact",
      "city",
      "address",
    ];

    for (let field of requiredFields) {
      if (field === "city" && pgData.city === "Other" && !pgData.cityInput) {
        setMessage("City field cannot be empty.");
        return;
      } else if (!pgData[field] && field !== "city") {
        setMessage(`${field} field cannot be empty.`);
        return;
      }
    }

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();

      for (const key in pgData) {
        if (key === "images") {
          pgData.images.forEach((file) => {
            formData.append("images", file);
          });
        } else if (key === "city") {
          formData.append(
            "city",
            pgData.city === "Other" ? pgData.cityInput : pgData.city
          );
        } else if (key !== "cityInput") {
          formData.append(key, pgData[key]);
        }
      }

      if (isEdit && id) {
        const res = await axios.put(
          `http://localhost:2001/updatePgData/${id}`,
          formData,
        );
        setMessage("Form Updated Successfully.");
        if (onSubmit) onSubmit(res.data);

        setTimeout(() => {
          setMessage("");
          navigate("/pg-owner-dashboard");
        }, 1500);
      } else {
        const response = await axios.post(
          "http://localhost:2001/addpg",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            timeout:5000
          },
        
        );

        setMessage(response.data.message || "PG added successfully!");
        setPgData({
          pgname: "",
          pgtype: "",
          owner: "",
          contact: "",
          category: "",
          rent: "",
          city: "",
          cityInput: "",
          address: "",
          pincode: "",
          nearestCollege: "",
          images: [],
        });
      }
    } catch (error) {
      console.error(error);
      setMessage("Error submitting form.");
    }
  };

  return (
    <div className="add-new-pg">
      <div className="form-heading">
        <div className="back-to-home">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>
          </Link>
        </div>
        <h2>Add New PG</h2>
      </div>
      <form className="add-pg-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="pgname-n-type">
            <div className="input pg-name">
              <label htmlFor="pgname">
                PG name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="pgname"
                id="pgname"
                value={pgData.pgname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input pg-type">
              <label htmlFor="pgtype">
                PG type <span className="required">*</span>
              </label>
              <select
                name="pgtype"
                id="pgtype"
                value={pgData.pgtype}
                onChange={handleChange}
              >
                <option value="">--Select type--</option>
                <option value="girls">Girls</option>
                <option value="boys">Boys</option>
              </select>
            </div>
          </div>

          <div className="owner-n-contact">
            <div className="input owner-name">
              <label htmlFor="owner">
                Owner Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                value={pgData.owner}
                onChange={handleChange}
              />
            </div>
            <div className="input owner-contact">
              <label htmlFor="contact">
                Contact <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="contact"
                id="contact"
                value={pgData.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="rent-n-category">
            <div className="input pg-category">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={pgData.category}
                onChange={handleChange}
              >
                <option value="">--Select Category--</option>
                <option value="pg">PG</option>
                <option value="rooms">Rooms</option>
                <option value="single">Single</option>
                <option value="sharing">Sharing</option>
              </select>
            </div>
            <div className="input pg-rent">
              <label htmlFor="rent">Rent Per Month</label>
              <input
                type="number"
                name="rent"
                id="rent"
                value={pgData.rent}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="city-address-pincode">
            <div className="input pg-city">
              <label htmlFor="city">
                City <span className="required">*</span>
              </label>
              {pgData.city === "Other" ? (
                <input
                  type="text"
                  name="cityInput"
                  id="cityInput"
                  placeholder="Enter city name"
                  value={pgData.cityInput}
                  onChange={handleChange}
                />
              ) : (
                <select
                  name="city"
                  id="city"
                  value={pgData.city}
                  onChange={handleChange}
                >
                  <option value="">--Select City--</option>
                  <option value="durg">Durg</option>
                  <option value="bhilai">Bhilai</option>
                  <option value="nehru nagar">Nehru Nagar</option>
                  <option value="supela">Supela</option>
                  <option value="smriti nagar">Smriti Nagar</option>
                  <option value="hudco">Hudco</option>
                  <option value="deepak nagar">Deepak Nagar</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
            <div className="input pg-address">
              <label htmlFor="address">
                Address/Area <span className="required">*</span>
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={pgData.address}
                onChange={handleChange}
              />
            </div>
            <div className="input pg-pincode">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="number"
                name="pincode"
                id="pincode"
                value={pgData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <p className="near-by-facilities">Nearby facilities</p>
          <div className="input">
            <label htmlFor="nearestCollege">Nearest College</label>
            <select
              name="nearestCollege"
              id="nearestCollege"
              value={pgData.nearestCollege}
              onChange={handleChange}
            >
              <option value="">--Select College--</option>
              <option value="BIT">BIT</option>
              <option value="Science College">Science College</option>
            </select>
          </div>

          <div className="input">
            <label htmlFor="images">Add image</label>
            <input
              type="file"
              name="images"
              id="images"
              multiple
              onChange={handleChange}
            />
          </div>
        </div>

        <div>{message}</div>
        <button type="submit" className="add-pg-button">
          {isEdit?"Update":"Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddNewPg;
