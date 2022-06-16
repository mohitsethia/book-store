import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./CustomTextField";

const PaymentForm = ({ nextStep, backStep, shippingData }) => {
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Form
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => {})}>
          <Grid container spacing={3}>
            <FormInput required name="cardNumber" label="Card Number" />
            <FormInput required name="expiryDate" label="Expiry Date" />
            <FormInput required name="cvv" label="CVV" />
            <FormInput required name="cardholder" label="Card Holder Name" />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={backStep}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default PaymentForm;
