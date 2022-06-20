const router = require("express").Router();

const { isLoggedIn, isAdmin } = require("../middleware/auth");
const User = require("../models/User.model");

router.get("/", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
