import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthCheck } from "../config/AuthCheck";
import { Header } from "./Header";
import { Footer } from "./Footer";

function Main() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [about, setAbout] = useState("");
  const [sex, setSex] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    AuthCheck()
      .then((resp) => {
        setUsername(resp.data.username);
        setEmail(resp.data.email);
        setFirstname(resp.data.firstname ? resp.data.firstname : "");
        setAbout(resp.data.about ? resp.data.about : "");
        setSex(resp.data.sex ? resp.data.sex : "");
        setCreatedAt(new Date(resp.data.created_at).toLocaleString());
        setUpdatedAt(new Date(resp.data.updated_at).toLocaleString());

        setAuthorized(true);

        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/register"
        ) {
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err);

        setAuthorized(false);

        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <div className="App">
      <Header authorized={authorized} />
      <main className="main">
        <Outlet
          context={{
            username: username,
            setUsername: setUsername,
            email: email,
            setEmail: setEmail,
            firstname: firstname,
            setFirstname: setFirstname,
            about: about,
            setAbout: setAbout,
            sex: sex,
            setSex: setSex,
            createdAt: createdAt,
            setCreatedAt: setCreatedAt,
            updatedAt: updatedAt,
            setUpdatedAt: setUpdatedAt,
            authorized: authorized,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export { Main };
