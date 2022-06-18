const router = require("express").Router();

const User = require("../models/User.model");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
