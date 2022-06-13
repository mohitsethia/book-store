import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
// import Register from "../register/Register";

const Navbar = ({ totalItems, login, role, setLogin,userName }) => {
  const classes = useStyles();
  const location = useLocation();
  console.log(role);

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Library"
              height="50px"
              className={classes.image}
            />
            <strong>Library</strong>
          </Typography>

          <div className={classes.grow} />

          <div className={classes.button}>
            {!login && (
              <Link className={classes.link} to="/Login">
                Login
              </Link>
            )}
            {!login && (
              <Link className={classes.link} to="/Register">
                Register
              </Link>
            )}
            {login && (
              <button
                onClick={() => {
                  setLogin(false);
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </button>
            )}
            {login && role === "ADMIN" && (
              <Link className={classes.link} to="/Admin">
                Admin
              </Link>
            )}
            {login && role === "CUSTOMER" && (
              <Link className={classes.link} to="/Customer">
                {userName}
              </Link>
            )}
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
