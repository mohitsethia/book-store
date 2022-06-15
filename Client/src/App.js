import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Footer from "./components/Footer/Footer";
import Getbooks from "./components/Admin/Getbooks";
import Sidebar from "./components/Admin/Sidebar";
import Dashboard from "./components/Admin/Dashboard";
import AddBook from "./components/Admin/AddBook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Userlist from "./components/Admin/Userlist";
import axios from "axios";
import UpdateBook from "./components/Admin/UpdateBook";
import ViewOrders from "./components/Admin/ViewOrders";
import MyOrders from "./components/UserOrders/MyOrders";

const App = ({ setLoginUser }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:9002/books");

    setProducts(data);
    console.log(data);
  };
  // const fetchCart = async () => {
  //   const response = await axios.get("http://localhost:9002/cart", {
  //     headers: { authorization: token },
  //   });
  //   setCart(response.data);
  // };

  const handleCart = async (productId, operation = "Add") => {
    if (operation === "Remove") {
      setCart((items) => items.filter((item) => item._id !== productId));
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => item._id !== productId))
      );
      return;
    }
    const item = products.find((item) => item._id === productId);
    const quantity =
      cart.find((cartItem) => cartItem._id === productId)?.quantity ?? 0;
    const cartItem = {
      ...item,
      quantity:
        operation === "Add"
          ? quantity + 1
          : operation === "Sub"
          ? quantity - 1
          : quantity,
    };
    if (operation === "Add" && cartItem.quantity === 1) {
      setCart((items) => [...items, cartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
    } else if (operation === "Sub" && cartItem.quantity === 0) {
      setCart((items) => items.filter((item) => item._id !== productId));
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => item._id !== productId))
      );
    } else {
      setCart((items) =>
        items.map((item) => {
          return item._id === productId ? cartItem : item;
        })
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.map((item) => {
            return item._id === productId ? cartItem : item;
          })
        )
      );
    }
  };

  // const handleUpdateCartQty = async (lineItemId, quantity) => {
  //   const response = await commerce.cart.update(lineItemId, { quantity });

  //   setCart(response.cart);
  // };

  // const handleRemoveFromCart = async (lineItemId) => {
  //   const response = cart.filter((item) => item._id !== lineItemId);

  //   setCart(response);
  // };

  const handleEmptyCart = async () => {
    setCart([]);
  };

  // const refreshCart = async () => {
  //   const newCart = await commerce.cart.refresh();

  //   setCart(newCart);
  // };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    // fetchCart();
  }, []);

  console.log({ token });
  console.log("role: ", { role }, " username: ", { userName }, " another ", {
    setUserName,
  });
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div>
      <Router>
        <div style={{ display: "flex" }}>
          <CssBaseline />
          <Navbar
            totalItems={cart?.length}
            handleDrawerToggle={handleDrawerToggle}
            login={login}
            role={role}
            setLogin={setLogin}
            userName={userName}
          />
          <Switch>
            <Route exact path="/">
              <Products products={products} onAddToCart={handleCart} />
            </Route>
            <Route exact path="/login">
              <Login
                login={login}
                setLogin={setLogin}
                setRole={setRole}
                setUserName={setUserName}
              />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                handleCart={handleCart}
                onEmptyCart={handleEmptyCart}
              />
            </Route>
            <Route path="/checkout" exact>
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            </Route>
            <Route path="/product-view/:id" exact>
              <ProductView />
            </Route>
            <Route path="/Userlist" exact>
              <Userlist login={login} role={role} />
            </Route>
            <Route path="/AddBook" exact>
              <AddBook setProducts={setProducts} />
            </Route>
            <Route path="/update/:id" exact>
              <UpdateBook login={login} role={role} />
            </Route>
            <Route path="/getbooks" exact>
              <Getbooks login={login} role={role} />
            </Route>
            <Route path="/vieworders" exact>
              <ViewOrders login={login} role={role} />
            </Route>
            <Route path="/myorders" exact>
              <MyOrders login={login} role={role} />
            </Route>

            <Route path="/Admin" exact>
              <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                  <Sidebar login={login} role={role} />
                  <Dashboard login={login} role={role} />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
