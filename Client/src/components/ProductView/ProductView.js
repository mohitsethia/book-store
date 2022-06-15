import React from 'react'
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {commerce} from '../../lib/commerce';
import { useState, useEffect } from "react";
import './style.css'

const createMarkup = (text) => {
    return { __html: text };
  };

const ProductView = ({products}) => {

    const [product, setProduct] = useState({});

    const fetchProduct = (id) => {
      const response = products.find((item) => item._id === id);
      console.log({ response });
      setProduct( response );
    };

      useEffect(() => {
        const id = window.location.pathname.split("/");
        fetchProduct(id[2]);
      }, []);
       console.log('product',product);
    return (
        <Container className="product-view">
          <Grid container>
            <Grid item xs={12} md={6} className="image-wrapper">
              <img src={product.media} alt={product.name}
              />
            </Grid>
            <Grid item xs={12} md={5} className="text">
              <Typography variant="h2"><b>{product.name}</b></Typography>
              <hr />
              <Typography variant="p"> By <b>{product.author}</b> (Author) </Typography>
              <br/><br/>
              <Typography variant="p"> Category : <b>{product.category}</b> </Typography>
              <br/><br/>
              <Typography variant="p" dangerouslySetInnerHTML={createMarkup(product.description)} />
              <br/><br/>
              <Typography variant="h3" color="secondary" >Price: <b> ₹{product.price} </b> </Typography>
              <br/>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Button size="large" className="custom-button" component={Link} to='/' >
                     Continue Shopping
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      );
    };
    
    export default ProductView;
