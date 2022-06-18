import React, { useMemo, useState } from "react";
import { Grid, InputAdornment, Input, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import Carousel from "react-bootstrap/Carousel";
import logo1 from "../../assets/2.jpeg";
import logo2 from "../../assets/4.jpeg";
import logo3 from "../../assets/3.jpeg";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  }
  const filteredProducts = useMemo(() => {
    if (searchTerm === "" && category === "All") {
      return products;
    } else if (searchTerm !== "") {
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (category !== "All") {
      return products.filter((product) => product.category === category);
    }
  }, [products, searchTerm, category]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Carousel fade infiniteLoop useKeyboardArrows autoPlay>
        <Carousel.Item>
          <img className="d-block w-100" src={logo1} alt=" slide" />
          <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="default"
              href="#pro"
            >
              Explore Books
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={logo3} alt="Second slide" />
          <Carousel.Caption>
            <Button
              className={classes.but}
              size="large"
              variant="contained"
              color="secondary"
              component={Link}
              to="/cart"
            >
              Checkout Cart
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={logo2} alt="Second slide" />
          <Carousel.Caption>
            <Button
              onClick={handleScroll}
              className={classes.but}
              size="large"
              variant="contained"
              color="primary"
              href="#foot"
            >
              About Us
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className={classes.searchs}>
        <Input
          className={classes.searchb}
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
      <br />
      <div className="menu-tabs container">
        <div className="menu-tab d-flex justify-content-around">
          <Stack spacing={2} direction="row">
            <Button
              className={classes.allbtn}
              variant="text"
              onClick={() => setCategory("All")}
            >
              All
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={() => setCategory("Fiction")}
            >
              Fiction
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={() => setCategory("Kids")}
            >
              Kids
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={() => setCategory("Motivation")}
            >
              Motivation
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={() => setCategory("Article")}
            >
              Article
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={() => setCategory("Novel")}
            >
              Novel
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={() => setCategory("Scientific")}
            >
              Scientific
            </Button>
          </Stack>
        </div>
      </div>

      <Grid className={classes.content} container justify="center" spacing={5}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} id="pro">
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
