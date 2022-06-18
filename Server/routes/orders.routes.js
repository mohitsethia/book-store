const router = require("express").Router();

const User = require("../models/User.model");
const Order = require("../models/Order.model");
const stripe = require("../lib/stripe");
const { decodeJWT } = require("../lib/jwt");

router.get("/", async (req, res) => {
  const allOrders = await Order.find().populate("user").lean();
  res.json(allOrders);
});

router.get("/me", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = decodeJWT(token);

  const allOrders = await Order.find({
    user: decoded?.userId,
  });
  res.json(allOrders);
});

router.post("/checkout", async (req, res) => {
  const { id, amount, token, lineItems } = req.body;

  const decoded = decodeJWT(token);
  const user = await User.findById(decoded?.userId);

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "INR",
      description: `By ${user.name}`,
      payment_method: id,
      confirm: true,
    });
    if (payment.status === "succeeded") {
      const order = new Order({
        paymentId: payment.id,
        amount: amount.toString(),
        user: decoded?.userId,
        lineItems,
      });
      await order.save();
      return res.status(200).json({
        order,
      });
    } else {
      return res.status(500).json({
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
