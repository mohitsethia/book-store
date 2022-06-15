const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authVerify = require("./auth");
const jwt = require("jsonwebtoken");
const mySecret =
  "s0gycZ/BVieolE574SbiFL6kO73VTMp3xgiML5ewkxkmYmwI16AsJaqLILJ/Nv7gQKIBeG8M/GzwXJnoquEHmKvGYs4Ksn0ixYprPONlBE+avE7h34BKS7S2LJ++fHLv9J0JNb2qP1TZdOYKx7qyOuqmueR63aF4y364rR2HTXCLoSTyxNHk9f12yNFjixdzdhF8d+sPzhDBfNuPS5wuhVGeBEqsK7xwbo6zmeCHvLcPJPH2UpzC7LlJN4dJK3kCZj7mHzzs5LhDz0tMT4XNi/1kjPNkefo5txC2EHPt14M+6UNLI1Gt31nlRPqSG7Gg7agjXwDMZS3LW3AYHe1lcA==";

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

mongoose.connect(
  "mongodb://localhost:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log(err);
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  author: String,
  media: String,
  category: String,
});

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId },
//   bookId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Book",
//   },
//   quantity: Number,
// });

// const Cart = new mongoose.model("Cart", cartSchema);
const User = new mongoose.model("User", userSchema);
const Book = new mongoose.model("Book", bookSchema);

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
              expiresIn: "24hr",
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

// app.get("/cart", authVerify, (req, res) => {
//   const { userId } = req.user;
//   Cart.find({ userId }, (err, carts) => {
//     if (err) {
//       res.send(err);
//     } else {
//       console.log(carts);
//       res.send(carts);
//     }
//   }).populate("bookId");
// });
// app.post("/cart", authVerify, (req, res) => {
//   const { userId } = req.user;
//   const { bookId, quantity } = req.body;
//   const cart = new Cart({
//     userId,
//     bookId,
//     quantity,
//   });
//   cart.save((err, cart) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send({ message: "Book added to Cart successfully", cart });
//     }
//   });
// });
app.get("/books", (req, res) => {
  // await Book.insertMany(quizData)

  Book.find({}, (err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
});

app.get("/books/:id", (req, res) => {
  // await Book.insertMany(quizData)

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

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
