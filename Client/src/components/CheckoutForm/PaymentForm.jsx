import { Typography } from "@material-ui/core";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../lib/axios";
import React from "react";
import { STRIPE_PUBLIC_KEY } from "../../utils/constants";

const stripeTestToPromise = loadStripe(STRIPE_PUBLIC_KEY);

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
      const res = await axios.post(
        "/orders/checkout",
        {
          id,
          amount: cartTotal,
          lineItems: cart.map((book) => ({
            book: book._id,
            quantity: book.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(res.data);
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
