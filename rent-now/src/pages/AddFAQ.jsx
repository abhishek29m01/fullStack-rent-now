import React, { useState } from "react";
import "../css/metastyle.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleFaqSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2001/addFaq", { question, answer })
      .then((res) => {
        console.log(res.data);
        setMessage("FAQ added successfully ✅.");
        setError(false);
        setQuestion(""); 
        setAnswer("");
      })
      .catch((err) => {
        console.error("Error on submitting data.");
        setMessage("Error occurred while adding FAQ.");
        setError(true); // ✅ Set error state
      });

      setTimeout(()=>{
        setMessage("");
      },5000)
  };

  return (
    <div className="add-faq-page">
      <div className="add-new-faq">
        <div className="faq-form-heading">
          <div className="back-to-home">
            <Link to="/">
              <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>
            </Link>
          </div>
          <h2>Add New FAQ</h2>
        </div>

        <form action="" className="add-faq" onSubmit={handleFaqSubmit}>
          <div className="inputs">
            <div className="m-10">
              {/* for margin purpus  */}
              <div className="input">
                <label htmlFor="">
                  Enter FAQ Question <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="faqQuestion"
                  id="faqQuestion"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <label htmlFor="">
                  Enter FAQ Answer <span className="required">*</span>
                </label>
                <textarea
                  type="text"
                  name="faqQuestion"
                  id="faqQuestion"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                  cols=""
                  rows="5"
                />
              </div>
            </div>
          </div>
          <div className={error ? "message-red" : "message-green"}>
            {message}
          </div>

          <button className="faq-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddFAQ;
