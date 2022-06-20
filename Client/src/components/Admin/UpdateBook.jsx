import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "../../lib/axios";
import { useHistory, useParams } from "react-router-dom";
import { categories } from "../Products/Products";

const UpdateBook = ({ login, role, token }) => {
  const { id } = useParams();
  const { push } = useHistory();
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
    if (!login || role !== "ADMIN") {
      push("/");
    } else {
      async function getBook() {
        try {
          const res = await axios(`/books/${id}`);
          setBook(res.data);
        } catch (error) {
          setError(error.message);
        }
      }
      getBook();
    }
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
      const res = await axios.patch(`/books/update/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBook(res.data);
      push("/");
    } catch (error) {
      console.log("Something is Wrong");
    }
  }

  return (
    <div className="register">
      <h1>Update Book</h1>
      <input
        type="text"
        name="name"
        value={book.name}
        placeholder="Book Name"
        onChange={(e) => onTextFieldChange(e)}
      ></input>
      <select
        name="category"
        id="category"
        value={book.category}
        onChange={onTextFieldChange}
        required
      >
        <option value="none" selected disabled hidden>
          Select a Category
        </option>
        {categories.map(
          (category) =>
            category !== "all" && (
              <option key={category} value={category}>
                {category}
              </option>
            )
        )}
      </select>
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
