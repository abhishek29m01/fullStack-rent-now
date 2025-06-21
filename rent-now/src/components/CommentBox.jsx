import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StartRatingInput from "./StartRatingInput";
import axios from "axios";

const CommentBox = ({ pgId, userId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Submitted");
    setError("");

    setTimeout(()=>{
        setMessage("");
        setError("")
    },2000)
    // if (!userId) {
    //   alert("Please log in to submit a review.");
    //   navigate("/login");
    //   return;
    // } implementation after integration jwt.

    //post comment

    // will continue after pg more details and jwt 
    axios
      .post("http://localhost:2001/addReviews", {
        pgId,
        userId,
        rating,
        review,
      })
      .then((res) => {
        setMessage("Review submitted succefully.");
        setReview("");
        setRating(0);
        onReviewSubmit(); //referesh list 
        console.log(res.data); //debugging
      })
      .catch((error) => {
        setError(error.response?.data?.error || "Submission failed.");
      });
  };

  return (
    <div className="comment-box">
      <StartRatingInput rating={rating} setRating={setRating} />
      <div className="comment-box-title">
        <h3>Write a Review</h3>
      </div>

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="input">
          <textarea
            name="comment"
            id="comment-box"
            value={review}
            onChange={(evt) => setReview(evt.target.value)}
            placeholder="your review"
            rows={4}
          />
        </div>
        {message && <p className="comment-submit-message">{message}</p>}
        {error && <p className="comment-submit-message">{error}</p>}
        <button className="submit-review">Submit</button>
      </form>
    </div>
  );
};

export default CommentBox;
