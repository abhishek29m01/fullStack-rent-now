const express = require("express");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

//api for signup with OTP
const sendOtp = require("../utils/sendOtp");

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
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing && existing.isVerified) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (existing && !existing.isVerified) {
      existing.username = username;
      existing.contact = contact;
      existing.userType = userType;
      existing.otp = otp;
      existing.otpExpiresAt = otpExpiresAt;
      existing.password = await bcrypt.hash(newPassword, 10);
      await existing.save();
      console.log(existing)
    } else {
      const newUser = new User({
        username,
        contact,
        email,
        userType,
        otp,
        otpExpiresAt,
        password: await bcrypt.hash(newPassword, 10),
        isVerified: false,
      });
      // console.log(newUser)
      await newUser.save();
    }

    await sendOtp(email, otp);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

//otp verification route
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.isVerified) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtp(email, otp);
    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to resend OTP" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userType: user.userType,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" } // Optional: expire token in 7 days
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      userType: user.userType,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

router.get("/user-info", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token Missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userInfo = await User.findById(decoded.userId).select("-password");
    res.json(userInfo);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
