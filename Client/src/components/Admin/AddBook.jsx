import React, { useState } from "react";
import "./style.css";
import axios from "../../lib/axios";
import { useHistory } from "react-router-dom";
import { categories } from "../Products/Products";

const AddBook = ({ login, role, token }) => {
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

  const handle = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const addbook = async () => {
    if (!login || role !== "ADMIN") {
      push("/");
    } else {
      try {
        const { name, description, price, author, media, category } = book;
        if (name && description && price && author && media && category) {
          const response = await axios.post("/books", book, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert(response.data.name);
          push("/getbooks");
        } else {
          alert("invalid input");
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="register">
      {console.log("Book", book)}
      <h1>Add a Book</h1>
      <input
        type="text"
        name="name"
        value={book.name}
        placeholder="Book Name"
        onChange={(e) => handle(e)}
      ></input>
      <select name="category" id="category" onChange={handle} required>
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
        onChange={(e) => handle(e)}
      ></input>
      <input
        type="text"
        name="price"
        value={book.price}
        placeholder="Price"
        onChange={(e) => handle(e)}
      ></input>
      <input
        type="text"
        name="author"
        value={book.author}
        placeholder="Author Name"
        onChange={(e) => handle(e)}
      ></input>
      <input
        type="text"
        name="media"
        value={book.media}
        placeholder="Image URL"
        onChange={(e) => handle(e)}
      ></input>

      {error && <p style={{ color: "red" }}>Error- {error}</p>}
      <div className="button" onClick={addbook}>
        Add Book
      </div>
    </div>
  );
};

export default AddBook;
