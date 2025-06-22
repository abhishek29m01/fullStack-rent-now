const express = require("express");
const Review = require("../models/Reviews");
const PgCollection = require("../models/PgCollections");
const Users = require("../models/Users");
const router = express.Router();

//1. post/add a review
router.post("/addReviews", async (req, res) => {
  try {
    const { pgId, userId, rating, review } = req.body;
    //   checking existance of pg
    const pg = await PgCollection.findById(pgId);
    if (!pg) return res.status(404).json({ error: "PG not found" });

    // Check if user exists
    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // create review
    const newReview = new Review({
      pgId,
      userId,
      rating,
      review,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

//2. route to get revies and rating for pg
router.get("/pgReviews/:pgId", async (req, res) => {
  try {
    const { pgId } = req.params;
    const reviews = await Review.find({ pgId })
      .populate("userId", "username email")
      .sort({ date: -1 }); //populating user's basic info.
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Could not fetch reviews." });
  }
});

module.exports = router;
