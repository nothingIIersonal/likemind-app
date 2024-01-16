import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthCheck } from "../config/AuthCheck";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [about, setAbout] = useState("");
  const [sex, setSex] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    AuthCheck()
      .then((resp) => {
        setUsername(resp.data.username);
        setEmail(resp.data.email);
        setFirstname(resp.data.firstname ? resp.data.firstname : "-");
        setAbout(resp.data.about ? resp.data.about : "-");
        setSex(resp.data.sex ? resp.data.sex : "-");
        setCreatedAt(new Date(resp.data.created_at).toLocaleDateString());
        setUpdatedAt(new Date(resp.data.updated_at).toLocaleDateString());
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err);
        navigate("/login");
      });
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
              <span className="firstname-val">{firstname}</span>
              <span className="about">
                <p>About:</p>
              </span>
              <span className="about-val">{about}</span>
              <span className="sex">
                <p>Sex:</p>
              </span>
              <span className="sex-val">{sex}</span>
              <span className="created-at">
                <p>Profile created:</p>
              </span>
              <span className="created-at-val">{createdAt}</span>
              <span className="updated-at">
                <p>Profile updated:</p>
              </span>
              <span className="updated-at-val">{updatedAt}</span>
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
