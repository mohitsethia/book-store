import { Button, Grid, Typography } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./CustomTextField";
import React from "react";

const AddressForm = ({ nextStep, setShippingData }) => {
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            setShippingData(data);
            nextStep();
          })}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="address1" label="Address Line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="mobileno" label="Mobile Number" />
            <FormInput required name="city" label="City" />
            <FormInput required name="state" label="State" />
            <FormInput required name="zip" label="Zip / Postal Code" />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
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

export default AddressForm;
