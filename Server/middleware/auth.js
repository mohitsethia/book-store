const { decodeJWT } = require("../lib/jwt");
const User = require("../models/User.model");

async function isLoggedIn(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Not logged in" });
    }
    const decoded = await decodeJWT(token);

    const user = await User.findById(decoded?.userId);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function isAdmin(req, res, next) {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(401).json({ message: "You are not authorized" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { isLoggedIn, isAdmin };
