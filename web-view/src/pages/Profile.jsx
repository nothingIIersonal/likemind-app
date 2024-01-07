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
      <div>
        <h2>Profile</h2>
        <p>Hello, {username}</p>
        <p>Your email: {email}</p>
        <button onClick={handleLogout} className="link-click">
          Logout
        </button>
      </div>
    </>
  );
}

export { Profile };
