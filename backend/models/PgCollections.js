const mongoose = require("mongoose");
const pgSchema = new mongoose.Schema({
  pgname: { type: String, required: true },
  pgtype: { type: String, required: true },
  owner: { type: String, required: true },
  contact: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  rent: Number,
  pincode: Number,
  category: String,
  nearestCollege: String,
  images: [String], // store file paths
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("pgcollections", pgSchema);

// "name should be exactly as the collection in the database"
