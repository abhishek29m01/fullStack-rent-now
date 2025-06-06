import React, { useEffect, useState } from "react";
import "../css/components.css";

const images = ["/banner-1.jpg", "/banner-2.jpg", "/banner-3.jpg"];
const cities = ["Durg", "Bhilai", "Supela", "Nehru Nagar"];

const SliderBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [cityIndex, setCityIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation (smooth)
  useEffect(() => {
    let delay = typing ? 150 : 100;

    // Pause after full word or fully deleted
    if (typing && charIndex === cities[cityIndex].length) delay = 1000;
    if (!typing && charIndex === 0) delay = 500;

    const timeout = setTimeout(() => {
      if (typing) {
        if (charIndex < cities[cityIndex].length) {
          setDisplayText((prev) => prev + cities[cityIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setTyping(false);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setTyping(true);
          setCityIndex((prev) => (prev + 1) % cities.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, typing, cityIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="slider-banner">
      <div className="display-feature-heading">
        Find PG near by <span className="animated-text">{displayText}</span>
        <span className="cursor">|</span>
      </div>

      <form className="search-bar-main" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter keyword to search PG"
        />
        <button className="search-button-main">Search</button>
      </form>

      <div className="img">
        <img src={images[currentIndex]} alt={`Banner ${currentIndex + 1}`} />
      </div>
    </div>
  );
};

export default SliderBanner;
