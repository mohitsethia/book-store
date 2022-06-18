const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = new model("User", userSchema);

module.exports = User;
