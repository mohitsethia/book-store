import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const UpdateBook = ({ setProducts }) => {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState("");
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
        const book = await axios.get(`http://localhost:9002/books/${id}`);
        console.log(book.data);
        setBook(book.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getBook();
  }, [id]);

  function onTextFieldChange(e) {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:9002/update/${id}`, book);
      history.push("/");
    } catch (error) {
      console.log("Something is Wrong");
    }
  }
  function handleClick() {
    history.push("/");
  }
  return (
    <div className="register">
      {/* {console.log("Book", book)} */}
      <h1>Update Book</h1>
      <input
        type="text"
        name="name"
        value={book.name}
        placeholder="Book Name"
        onChange={(e) => onTextFieldChange(e)}
      ></input>
      <input
        type="text"
        name="category"
        value={book.category}
        placeholder="Book Category"
        onChange={(e) => onTextFieldChange(e)}
      ></input>
      <input
        type="text"
        name="description"
        value={book.description}
        placeholder="Description"
        onChange={(e) => onTextFieldChange(e)}
      ></input>
      <input
        type="text"
        name="price"
        value={book.price}
        placeholder="Price"
        onChange={(e) => onTextFieldChange(e)}
      ></input>
      <input
        type="text"
        name="author"
        value={book.author}
        placeholder="Author Name"
        onChange={(e) => onTextFieldChange(e)}
      ></input>
      <input
        type="text"
        name="media"
        value={book.media}
        placeholder="Image URL"
        onChange={(e) => onTextFieldChange(e)}
      ></input>

      {error && <p style={{ color: "red" }}>Error- {error}</p>}
      <div className="button" onClick={(e) => onFormSubmit(e)}>
        Update Book
      </div>
    </div>
  );
};

export default UpdateBook;
