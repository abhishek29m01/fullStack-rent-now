import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/metastyle.css";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]); // ✅ should be an array
  const [activeIndex, setActiveIndex] = useState(null); // ✅ for one open at a time

  const toggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    axios
      .get("http://localhost:2001/getFAQ")
      .then((res) => {
        setFaqs(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error fetching FAQs:", error);
      });
  }, []);

  return (
    <div className="faq-page">
      <Navbar />

      <div className="faq-display">
        <div className="faq-page-title">
          <h2>Frequently Asked Questions</h2>
          <p>
            Here are the most common, frequently asked questions about using
            Rent Now for creating account, adding pg, and search a pg for
            student.
          </p>
        </div>

        <div className="faq-banner">
          <img src="/faqImg.png" alt="" />
        </div>
      </div>

      {faqs.map((faq, index) => (
        <div className="faqs-container" key={faq._id || index}>
          <div
            className={`faq-question ${activeIndex === index ? "active-index" : ""}`}
            onClick={() => toggle(index)}
          >
            {faq.question}
            <span>{activeIndex === index ? "−" : "+"}</span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}

      <div className="my-50"></div>
    </div>
  );
};

export default FAQPage;
