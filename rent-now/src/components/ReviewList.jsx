import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      <div className="all-revies">
        <h2>All Reviews</h2>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div className="review-box" key={review._id}>
            <p className="user-name">
              <strong>{review.userId?.username || "Anonymous"}</strong>
            </p>

            <div className="rating-and-comment">
              <div>
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    key={i}
                    className="star-icon"
                    style={{
                      color: i < review.rating ? "#ffc107" : "#e4e5e9",
                      fontSize: "18px",
                      marginRight: "4px",
                    }}
                  />
                ))}
              </div>

              <p className="user-comment">{review.review}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
