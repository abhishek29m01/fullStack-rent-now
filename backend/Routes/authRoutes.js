const express = require("express");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const router = express.Router();

//api for signup
router.post("/signup", async (req, res) => {
  const { username, contact, email, newPassword, confirmPassword, userType } =
    req.body;
  if (
    !username ||
    !contact ||
    !email ||
    !newPassword ||
    !confirmPassword ||
    !userType
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Password do not match" });
  }

  try {
    const existingUser = await User.findOne({ contact });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already exist" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    const newUser = new User({
      username,
      contact,
      email,
      password: hashPassword,
      userType,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "wrong email or passord" });
    }

    return res.status(200).json({
      message: "Login successfull",
      token: "Not applied yet.",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
