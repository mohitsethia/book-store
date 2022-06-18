const { sign, verify } = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");

function encodeJWT(payload) {
  return new Promise((resolve, reject) => {
    sign(payload, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
}

function decodeJWT(token) {
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
}

module.exports = { encodeJWT, decodeJWT };
