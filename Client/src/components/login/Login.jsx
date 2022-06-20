import React, { useState } from "react";
import "./login.css";
import axios from "../../lib/axios";
import { useHistory } from "react-router-dom";

const Login = ({ setToken, setLogin, setRole, setUserName }) => {
  const [error, setError] = useState("");
  const { push } = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginhandler = async () => {
    try {
      const response = await axios.post("/auth/login", user);
      setLogin(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userName", response.data.name);
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
      setUserName(response.data.name);
      if (response.data.role === "ADMIN") {
        push("/Admin");
      } else {
        push("/");
      }
      console.log(response.data.name);
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>
      {error && <p style={{ color: "red" }}>Error- {error}</p>}
      <div className="button" onClick={loginhandler}>
        Login
      </div>
      <div>or</div>
      <div
        className="button"
        onClick={() => {
          push("/register");
        }}
      >
        Register
      </div>
    </div>
  );
};

export default Login;
