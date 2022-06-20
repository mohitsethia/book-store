const router = require("express").Router();

const { encodeJWT } = require("../lib/jwt");
const User = require("../models/User.model");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (user.verifyPassword(password)) {
        const token = await encodeJWT({ userId: user._id });
        res.status(200).json({
          token,
          role: user.role,
          name: user.name,
        });
      } else {
        res.status(403).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: "User already registered" });
    } else if (password.length < 8) {
      res
        .status(409)
        .json({ message: "make sure the of the password is greater than 8" });
    } else {
      const user = new User({
        name,
        email,
        password,
        role: email === "rajayush125@gmail.com" ? "ADMIN" : "CUSTOMER",
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
