import React, { useRef, useState, useEffect } from "react";
import CollegeCard from "./CollegeCard";
import SeeAll from "./SeeAll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const FindByCollege = () => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // small buffer for accuracy
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth;

    if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition(); // initial state

    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <div className="find-by-college">
      <div className="heading">
        <h2>Find Near Colleges</h2>
      </div>

      <div className={`fbc-wrapper ${!isAtStart ? "show-left-fade" : ""}`}>
        {!isAtStart && (
          <button className="arrow left" onClick={() => scroll("left")}>
            <FontAwesomeIcon icon={faArrowLeftLong} className="f-30" />
          </button>
        )}
        <div className="fbc-links" ref={scrollRef}>
          <CollegeCard college="BIT DURG" location="Durg" />
          <CollegeCard college="Uday Politechnic College" location="Durg" />
          <CollegeCard college="BIT DURG" location="Durg" />
          <CollegeCard college="BIT DURG" location="Durg" />
          <CollegeCard college="BIT DURG" location="Durg" />
          <CollegeCard college="BIT DURG" location="Durg" />
          <CollegeCard college="Sankaracharya" location="Kohka" />
          <SeeAll />
        </div>
        {!isAtEnd && (
          <button className="arrow right" onClick={() => scroll("right")}>
            <FontAwesomeIcon icon={faArrowRightLong} className="f-30" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FindByCollege;
