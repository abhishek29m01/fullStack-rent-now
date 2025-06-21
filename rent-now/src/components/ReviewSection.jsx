import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentBox from "./CommentBox";
import ReviewList from "./ReviewList";
const pgIds="68529dab863378be3f7a1687";
const ReviewSection = ({ pgId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const fetchReviews = () => {
    axios
      .get(`http://localhost:2001/pgReviews/${pgIds}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Review fetch failed:", err));
  };

  //PG ids are hardcode must not forget to remove it with original
//   origin- pgId
//   hardcoded: pgIds
  useEffect(() => {
    if (pgIds) {
      fetchReviews();
    }
  }, [pgIds]);

  return (
    <div className="review-section">
      <CommentBox pgId={pgId} userId={userId} onReviewSubmit={fetchReviews} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewSection;
