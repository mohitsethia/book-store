import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";

const Product = ({ product, onAddToCart, login, role }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={`product-view/${product._id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.media}
            title={product.name}
          />
        </CardActionArea>
      </Link>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="h6" color="secondary">
            ₹<b>{product.price}</b>
          </Typography>
        </div>
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<AddShoppingCart />}
          onClick={
            login && role === "CUSTOMER"
              ? () => onAddToCart(product._id)
              : () => history.push("/login")
          }
        >
          <b>ADD TO CART</b>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
