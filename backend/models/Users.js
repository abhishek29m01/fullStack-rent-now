const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  contact: { type: String, required: true,},
  email: { type: String, required: true, },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  isVerified:{type:Boolean,default:false},
  otp:String,
  otpExpiresAt:Date,
});

module.exports = mongoose.model("users", userSchema);
