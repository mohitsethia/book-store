import React, { useMemo, useState } from "react";
import { Grid, InputAdornment, Input, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo1 from "../../assets/2.jpeg";
import logo2 from "../../assets/4.jpeg";
import logo3 from "../../assets/3.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  }
  console.log(products);
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

  // const filterItem = async (categItem) => {
  //   const updatedItems = products.filter((product) => {
  //       return product.category === categItem;
  //   });

  //   try {
  //     console.log("category: ", categItem);
  //     const category = { category: categItem };
  //     const updatedItems = await axios.post("http://localhost:9002/getBooksByCategory", category);
  //     console.log("Items: ", updatedItems.data);
  //     setBooks(updatedItems.data);
  //   }
  //   catch (error) {
  //     setError(error.updatedItems);
  //   }
  // }

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
      <div className="menu-tabs container">
        <div className="menu-tab d-flex justify-content-around">
          <button className="btn btn-light" onClick={() => setCategory("All")}>
            All
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setCategory("Fiction")}
          >
            Fiction
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setCategory("Horror")}
          >
            Horror
          </button>
          {/* <button className="btn btn-warning" onClick={() => filterItem('evening')}>Evening</button>
              <button className="btn btn-warning" onClick={() => filterItem('dinner')}>Dinner</button> */}
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
