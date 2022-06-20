import { Typography } from "@material-ui/core";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const PUBLIC_KEY =
  "pk_test_51LCdt0SFPunBGkuYGtBdv9rznRPpyA544MggcXjeWzJ1GrTlc7ok909NAnSafZSuwgfCFpIbojFUGo3Xah9FBiPV00FFO5vIKO";

const stripeTestToPromise = loadStripe(PUBLIC_KEY);

const Form = ({ clearCart, cartTotal, nextStep, setOrder, cart, token }) => {
  const stripe = useStripe();
  const elements = useElements();

  async function submitHandler(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const res = await fetch("http://127.0.0.1:9002/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          token,
          amount: cartTotal,
          lineItems: cart.map((book) => ({
            book: book._id,
            quantity: book.quantity,
          })),
        }),
      });
      const { order } = await res.json();
      setOrder(order);
      clearCart();
      nextStep();
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Form
      </Typography>
      <form onSubmit={submitHandler}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </>
  );
};

export default function PaymentForm({
  setOrder,
  nextStep,
  shippingData,
  cartTotal,
  cart,
  token,
  clearCart,
}) {
  return (
    <Elements stripe={stripeTestToPromise}>
      <Form
        clearCart={clearCart}
        cart={cart}
        token={token}
        cartTotal={cartTotal}
        setOrder={setOrder}
        user={shippingData.firstName}
        nextStep={nextStep}
      />
    </Elements>
  );
}
