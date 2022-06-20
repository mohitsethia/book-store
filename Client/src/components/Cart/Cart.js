import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({ cart, handleCart, onEmptyCart }) => {
  const classes = useStyles();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/">
        {" "}
        start adding some
      </Link>
      !
    </Typography>
  );

  if (!cart) return "Loading";

  const renderCart = () => (
    <>
      <Grid container spacing={4}>
        {cart.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem._id}>
            <CartItem item={lineItem} handleCart={handleCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal:{" "}
          <b>
            {cart.reduce((acc, item) => {
              acc += item.price * item.quantity;
              return acc;
            }, 0)}
          </b>
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={onEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        <b>Your Shopping Cart</b>
      </Typography>
      <hr />
      {!cart.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
