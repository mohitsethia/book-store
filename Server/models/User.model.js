const { Schema, model } = require("mongoose");
const { hash, verify } = require("argon2");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  return verify(this.password, password);
};

const User = new model("User", userSchema);

module.exports = User;
