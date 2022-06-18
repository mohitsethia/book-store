const { STRIPE_SECRET_KEY } = require("../utils/constants");

const { default: Stripe } = require("stripe");

const stripe = new Stripe(STRIPE_SECRET_KEY);

module.exports = stripe;
