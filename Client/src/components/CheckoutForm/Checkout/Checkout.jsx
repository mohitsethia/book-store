import {
  CssBaseline,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";
import React from "react";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const steps = ["Shipping address", "Payment Details"];

const Checkout = ({ clearCart, token, cartTotal, order, setOrder, cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Confirmation = () => (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {shippingData.firstName}!
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order._id}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  );

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm nextStep={nextStep} setShippingData={setShippingData} />
    ) : (
      <PaymentForm
        clearCart={clearCart}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        cartTotal={cartTotal}
        setOrder={setOrder}
        token={token}
        cart={cart}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
