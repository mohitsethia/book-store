import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const BookView = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    name: "",
    description: "",
    price: "",
    author: "",
    media: "",
    category: "",
  });
  useEffect(() => {
    async function getBook() {
      try {
        const book = await axios.get(`http://127.0.0.1:9002/books/${id}`);
        console.log(book.data);
        setBook(book.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getBook();
  }, [id]);
  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={book.media} alt={book.name} />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{book.name}</b>
          </Typography>
          <hr />
          <Typography variant="p">
            {" "}
            By <b>{book.author}</b> (Author){" "}
          </Typography>
          <br />
          <br />
          <Typography variant="p">
            {" "}
            Category : <b>{book.category}</b>{" "}
          </Typography>
          <br />
          <br />
          <Typography
            variant="p"
            dangerouslySetInnerHTML={createMarkup(book.description)}
          />
          <br />
          <br />
          <Typography variant="h3" color="secondary">
            Price: <b> ₹{book.price} </b>{" "}
          </Typography>
          <br />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button
                size="large"
                className="custom-button"
                component={Link}
                to="/"
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookView;
