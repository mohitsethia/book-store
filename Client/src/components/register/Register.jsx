import React, { useState } from "react";
import "./register.css";
import axios from "../../lib/axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    librarian: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    try {
      const { name, email, password, reEnterPassword } = user;
      if (
        name &&
        email &&
        password.length > 8 &&
        password === reEnterPassword
      ) {
        const response = await axios.post("/auth/register", user);
        alert(response.data.message);
        history.push("/login");
      } else if (password.length < 8) {
        alert("password length is shorter!");
      } else {
        alert("invalid input");
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <div className="register">
      {console.log("User", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input>
      {error && <p style={{ color: "red" }}>Error- {error}</p>}
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
