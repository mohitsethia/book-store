const router = require("express").Router();

const Book = require("../models/Book.model");

router.get("/", async (req, res) => {
  const allBooks = await Book.find();
  res.json(allBooks);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

router.post("/", async (req, res) => {
  const { name, description, price, author, media, category } = req.body;
  const book = new Book({
    name,
    description,
    price,
    author,
    media,
    category,
  });
  await book.save();
  res.json(book);
});

router.post("/getBooksByCategory", async (req, res) => {
  const category = req.body.category;
  const book = await Book.find({ category });
  res.json(book);
});

router.delete("/delete/:id", async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.json(book);
});

router.patch("/update/:id", async (req, res) => {
  const { name, description, price, author, media, category } = req.body;
  const book = {
    name,
    description,
    price,
    author,
    media,
    category,
  };
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {
    new: true,
  });
  res.json(updatedBook);
});

module.exports = router;
