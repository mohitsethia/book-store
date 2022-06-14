import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ login, setLogin,setRole,setUserName }) => {
  const [error, setError] = useState("");
  const history = useHistory();

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
      const response = await axios.post("http://localhost:9002/login", user);
      setLogin(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userName", response.data.name);
      setRole(localStorage.getItem("role"))
      setUserName(response.data.name)
      if(response.data.role==="ADMIN") {
        history.push("/Admin");
      } else {
        history.push("/");
      }
      console.log(response.data.name);

    } catch (error) {
      setError(error?.response.data?.message);
      console.log(error);
      
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
      <div className="button" onClick={() => history.push("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
