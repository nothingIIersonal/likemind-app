import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ErrorSection } from "../components/ErrorSection";
import { AuthLoginURL } from "../config/APIUrls";
import { useNavigate } from "react-router-dom";
import { AuthCheck } from "../config/AuthCheck";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    AuthCheck()
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err);
      });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    };
    const headers = {
      withCredentials: true,
    };

    try {
      await axios.post(AuthLoginURL, form, headers).then(function () {
        navigate("/profile");
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
        <h2>LogIn</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            value={password}
            placeholder="********"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Log in</button>
        </form>
        {errorHidden ? <></> : <ErrorSection message={errorMessage} />}
        <Link to="/register" className="link-click">
          {"Don't have an account? Register here"}
        </Link>
      </div>
    </>
  );
}

export { Login };
