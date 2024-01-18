import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorSection } from "../components/ErrorSection";
import { RegisterURL } from "../config/APIUrls";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = {
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    try {
      await axios.post(RegisterURL, form).then(function () {
        navigate("/login");
      });
    } catch (err) {
      console.log("Error occured");
      console.log(err);

      setErrorMessage(err.message);
      setErrorHidden(false);
    }
  };

  return (
    <>
      <div className="auth-form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            value={password}
            placeholder="********"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Create an account!</button>
        </form>
        {errorHidden ? <></> : <ErrorSection message={errorMessage} />}
        <Link to="/login" className="link-click">
          Already have an account? Login here
        </Link>
      </div>
    </>
  );
}

export { Register };
