const router = require("express").Router();

const Order = require("../models/Order.model");
const stripe = require("../lib/stripe");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

router.get("/", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const allOrders = await Order.find().populate("user").lean();
    res.json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", isLoggedIn, async (req, res) => {
  try {
    const allOrders = await Order.find({
      user: req.user._id,
    });
    res.json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/checkout", isLoggedIn, async (req, res) => {
  try {
    const { id, amount, lineItems } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "INR",
      description: `By ${req.user.name}`,
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
      return res.status(201).json(order);
    } else {
      return res.status(500).json({
        message: "Payment not successful",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Payment failed",
    });
  }
});

module.exports = router;
