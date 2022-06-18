const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  author: String,
  media: String,
  category: String,
});

const Book = new model("Book", bookSchema);

module.exports = Book;
