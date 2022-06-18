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
  "pk_test_51J4t0XSCWKVouCVUCY7gtuxPn568hLqW6TrHXpgWzSrHrpcuwasejweepDw5Seie0MVn2zugCaC3ZxhKVPC2IJm700MJOeCe95";

const stripeTestToPromise = loadStripe(PUBLIC_KEY);

const Form = ({ cartTotal, nextStep, setOrder, cart, token }) => {
  console.log(cartTotal);
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
      const data = await res.json();
      setOrder({ data });
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
}) {
  return (
    <Elements stripe={stripeTestToPromise}>
      <Form
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
