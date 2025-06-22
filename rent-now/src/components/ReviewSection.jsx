import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentBox from "./CommentBox";
import ReviewList from "./ReviewList";
// const pgIds="68529dab863378be3f7a1687";
const ReviewSection = ({ pgId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const fetchReviews = () => {
    axios
      .get(`http://localhost:2001/pgReviews/${pgId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Review fetch failed:", err));
  };

  useEffect(() => {
    if (pgId) {
      fetchReviews();
    }
  }, [pgId]);

  return (
    <div className="review-section">
      <CommentBox pgId={pgId} userId={userId} onReviewSubmit={fetchReviews} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewSection;
