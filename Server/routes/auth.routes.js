const router = require("express").Router();

const { encodeJWT } = require("../lib/jwt");
const User = require("../models/User.model");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (password === user.password) {
      const token = encodeJWT({ userId: user._id });
      res.status(200).send({
        token,
        role: user.role,
        name: user.name,
      });
    } else {
      res.status(403).send({ message: "Incorrect Password" });
    }
  } else {
    res.status(404).send({ message: "No user found" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = User.findOne({ email });
  if (user) {
    res.status(409).send({ message: "User already registered" });
  } else if (password.length < 8) {
    res
      .status(409)
      .send({ message: "make sure the of the password is greater than 8" });
  } else {
    const user = new User({
      name,
      email,
      password,
      role: email === "rajayush125@gmail.com" ? "ADMIN" : "CUSTOMER",
    });
    await user.save();
    res.status(201).send({ message: "User registered successfully", user });
  }
});

module.exports = router;
