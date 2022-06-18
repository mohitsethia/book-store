require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connect, Schema, model } = require("mongoose");
const authVerify = require("./auth");
const jwt = require("jsonwebtoken");
const { default: Stripe } = require("stripe");
const mySecret =
  "s0gycZ/BVieolE574SbiFL6kO73VTMp3xgiML5ewkxkmYmwI16AsJaqLILJ/Nv7gQKIBeG8M/GzwXJnoquEHmKvGYs4Ksn0ixYprPONlBE+avE7h34BKS7S2LJ++fHLv9J0JNb2qP1TZdOYKx7qyOuqmueR63aF4y364rR2HTXCLoSTyxNHk9f12yNFjixdzdhF8d+sPzhDBfNuPS5wuhVGeBEqsK7xwbo6zmeCHvLcPJPH2UpzC7LlJN4dJK3kCZj7mHzzs5LhDz0tMT4XNi/1kjPNkefo5txC2EHPt14M+6UNLI1Gt31nlRPqSG7Gg7agjXwDMZS3LW3AYHe1lcA==";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);

connect(
  "mongodb://localhost:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log(err);
  }
);

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const bookSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  author: String,
  media: String,
  category: String,
});

const orderSchema = new Schema(
  {
    paymentId: String,
    amount: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lineItems: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = new model("User", userSchema);
const Book = new model("Book", bookSchema);
const Order = new model("Order", orderSchema);

//Routes
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        if (password === user.password) {
          const token = jwt.sign(
            { userId: user._id, role: user.role, userName: user.name },
            mySecret,
            {
              expiresIn: "20m",
            }
          );
          res.status(200).send({
            message: "Login Successfull",
            token,
            role: user.role,
            name: user.name,
          });
        } else {
          res.status(403).send({ message: "Password didn't match" });
        }
      } else {
        res.status(404).send({ message: "User not registered" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", (req, res) => {
  const { name, email, password, librarian } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(409).send({ message: "User already registered" });
    } else if (password.length <= 8) {
      res
        .status(409)
        .send({ message: "make sure the of the pssword is greater than 8" });
    } else {
      const user = new User({
        name,
        email,
        password,
        role: email === "rajayush125@gmail.com" ? "ADMIN" : "CUSTOMER",
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});

app.get("/books", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
});

app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
});

app.post("/books", (req, res) => {
  const { name, description, price, author, media, category } = req.body;
  const book = new Book({
    name,
    description,
    price,
    author,
    media,
    category,
  });
  book.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: "Book added successfully", book });
    }
  });
});

app.post("/getBooksByCategory", (req, res) => {
  const Category = req.body.category;
  console.log("Category: ", Category, " req body: ", req.body);
  Book.find({ category: Category }, (err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Book.deleteOne({ _id: id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, price, author, media, category } = req.body;
  const book = {
    $set: {
      name: name,
      description: description,
      price: price,
      author: author,
      media: media,
      category: category,
    },
  };
  Book.updateOne({ _id: id }, book, function (err) {
    if (err) {
      res.send(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get("/orders", (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      res.send(err);
    } else {
      res.json(orders);
    }
  });
});

app.post("/checkout", async (req, res) => {
  const { id, amount, token, lineItems } = req.body;

  const userId = jwt.verify(token, mySecret).userId;
  const user = await User.findById(userId);

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: `By ${user.name}`,
      payment_method: id,
      confirm: true,
    });
    if (payment.status === "succeeded") {
      const order = new Order({
        paymentId: payment.id,
        amount: payment.amount ?? amount,
        user: userId,
        lineItems,
      });
      await order.save();
      return res.status(200).json({
        order,
      });
    } else {
      return res.status(500).json({
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
