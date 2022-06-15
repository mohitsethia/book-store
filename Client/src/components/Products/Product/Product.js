<<<<<<< HEAD
import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button,CardActionArea} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Product = ({product, onAddToCart, login}) => {
    console.log({product})
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <Link to={`product-view/${product._id}`} >
        <CardActionArea>
        <CardMedia className={classes.media} image={product.media} title={product.name}  />
        </CardActionArea>
        </Link>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography  variant="h6">
            {product.name}
            </Typography>
            <Typography variant="h6" color="secondary">
              ₹<b>{product.price}</b> 
            </Typography>
          </div>
        </CardContent>
        {!login && (
        <CardActions disableSpacing className={classes.cardActions}>
          <Button variant="contained" className={classes.button} endIcon={<AddShoppingCart />} onClick={() => onAddToCart(product._id, 1)} >
            <b>ADD TO CART</b>
          </Button>
        </CardActions>

        )}
        </Card>
    )
}

=======
import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button,CardActionArea} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Product = ({product, onAddToCart, login}) => {
    console.log({product})
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <Link to={`product-view/${product._id}`} >
        <CardActionArea>
        <CardMedia className={classes.media} image={product.media} title={product.name}  />
        </CardActionArea>
        </Link>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography  variant="h6">
            {product.name}
            </Typography>
            <Typography variant="h6" color="secondary">
              ₹<b>{product.price}</b> 
            </Typography>
          </div>
        </CardContent>
        {!login && (
        <CardActions disableSpacing className={classes.cardActions}>
          <Button variant="contained" className={classes.button} endIcon={<AddShoppingCart />} onClick={() => onAddToCart(product._id, 1)} >
            <b>ADD TO CART</b>
          </Button>
        </CardActions>

        )}
        </Card>
    )
}

>>>>>>> a88ff28f4bc7556e88c2203288fb6095d41e3a8c
export default Product;