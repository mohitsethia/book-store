const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    paymentId: String,
    amount: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lineItems: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = new model("Order", orderSchema);

module.exports = Order;
