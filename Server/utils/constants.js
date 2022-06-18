require("dotenv").config();

const { NODE_ENV, PORT, MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY } =
  process.env;
const IS_PROD = NODE_ENV === "production";

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URI,
  JWT_SECRET,
  IS_PROD,
  STRIPE_SECRET_KEY,
};
