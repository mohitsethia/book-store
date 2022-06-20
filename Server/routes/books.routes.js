const router = require("express").Router();

const { isLoggedIn, isAdmin } = require("../middleware/auth");
const Book = require("../models/Book.model");

router.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Book not found" });
  }
});

router.post("/", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error when creating book",
    });
  }
});

router.delete("/delete/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params?.id);
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting book",
    });
  }
});

router.patch("/update/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params?.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating book",
    });
  }
});

module.exports = router;
