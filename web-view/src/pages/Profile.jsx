import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ProfileURL } from "../config/APIUrls";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function CheckToken() {
      const accessToken = Cookies.get("access_token");

      const headers = {
        Authorization: accessToken,
      };

      await axios({ method: "post", url: ProfileURL, headers: headers })
        .then((resp) => {
          setUsername(resp.data.username);
          setEmail(resp.data.email);
        })
        .catch((err) => {
          console.log("Error occured");
          console.log(err);
          navigate("/login");
        });
    }

    CheckToken();
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <>
      <div className="profile-container">
        <div className="default-container">
          <h2>Profile</h2>
          <div className="default-data-container">
            <div className="profile-data">
              <span className="username">
                <p>Username:</p>
              </span>
              <span className="username-val">{username}</span>
              <span className="email">
                <p>EMail:</p>
              </span>
              <span className="email-val">{email}</span>
              <span className="firstname">
                <p>First name:</p>
              </span>
              <span className="firstname-val">{email}</span>
              <span className="about">
                <p>About:</p>
              </span>
              <span className="about-val">{email}</span>
            </div>
            <div className="profile-buttons">
              <span className="logout-btn">
                <button onClick={handleLogout}>Logout</button>
              </span>
              <span className="edit-btn">
                <button onClick={handleLogout}>Edit</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Profile };
