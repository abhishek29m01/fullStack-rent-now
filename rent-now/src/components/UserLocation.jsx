import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const UserLocation = () => {
  const [coords, setCoords] = useState({ lat: null, long: null });
  const [locality, setLocality] = useState(null);
  const [error, setError] = useState("");

  const apikey = "694debd2294f4adcb91ec060b009f10c";

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, long: longitude });

        try {
          const res = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`
          );

          // Get the first result's components
          const components = res.data.results[0].components;

          // Extract locality: try city, town, village or fallback to county
          const localityName =
            components.city ||
            components.town ||
            components.village ||
            components.county ||
            "Unknown locality";

          setLocality(localityName);
        } catch (err) {
          setError("Failed to fetch locality details");
        }
      },
      (err) => {
        setError("Permission denied or error getting location");
      }
    );
  }, []);

  return (
    <div className="user-location">
     <FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
      {locality && (
        <p className="location-name">
        
          <strong>{locality}</strong>
        </p>
      )}
    </div>
  );
};

export default UserLocation;
