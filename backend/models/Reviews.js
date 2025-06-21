const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  pgId: { type: mongoose.Schema.Types.ObjectId, ref: "PgCollection" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  rating: { type: Number, min: 1, max: 5 },
  review: String,
  date: { type: Date, default: Date.now },
});

module.exports=mongoose.model('reviews',reviewSchema);