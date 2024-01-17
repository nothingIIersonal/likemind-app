import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthCheck, GetAccessToken } from "../config/AuthCheck";
import { DataFieldText, DataFieldDDL } from "../components/DataComponents";
import { ErrorSection } from "../components/ErrorSection";
import { UpdateProfileURL } from "../config/APIUrls";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [about, setAbout] = useState("");
  const [sex, setSex] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [usernameUpd, setUsernameUpd] = useState("");
  const [emailUpd, setEmailUpd] = useState("");
  const [firstnameUpd, setFirstnameUpd] = useState("");
  const [aboutUpd, setAboutUpd] = useState("");
  const [sexUpd, setSexUpd] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  const setUsernameUpdCallback = (val) => {
    setUsernameUpd(val);
  };
  const setEmailUpdCallback = (val) => {
    setEmailUpd(val);
  };
  const setFirstnameUpdCallback = (val) => {
    setFirstnameUpd(val);
  };
  const setAboutUpdCallback = (val) => {
    setAboutUpd(val);
  };
  const setSexUpdCallback = (val) => {
    setSexUpd(val);
  };

  const [editMode, setEditMode] = useState(false);

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
      })
      .catch((err) => {
        console.log("Error occured");
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove("access_token");
    navigate("/login");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    setUsernameUpd(username);
    setEmailUpd(email);
    setFirstnameUpd(firstname);
    setAboutUpd(about);
    setSexUpd(sex);

    setEditMode(true);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setErrorMessage("TODO :)");
    setErrorHidden(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const form = {
      new_user: {
        username: usernameUpd,
        email: emailUpd,
        firstname: firstnameUpd,
        about: aboutUpd,
        sex: sexUpd,
      },
    };

    try {
      await axios({
        method: "post",
        url: UpdateProfileURL,
        data: form,
        headers: {
          Authorization: GetAccessToken(),
        },
      }).then((resp) => {
        setUsername(resp.data.new_user.username);
        setEmail(resp.data.new_user.email);
        setFirstname(
          resp.data.new_user.firstname ? resp.data.new_user.firstname : "",
        );
        setAbout(resp.data.new_user.about ? resp.data.new_user.about : "");
        setSex(resp.data.new_user.sex ? resp.data.new_user.sex : "");
        setCreatedAt(new Date(resp.data.new_user.created_at).toLocaleString());
        setUpdatedAt(new Date(resp.data.new_user.updated_at).toLocaleString());

        setEditMode(false);
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
      <div className="profile-container">
        <div className="default-container">
          <h2>Profile</h2>
          <div className="default-data-container">
            <div className="profile-data">
              <DataFieldText
                editMode={editMode}
                className="username"
                title="Username"
                editable={true}
                defaultValue={username}
                updValue={usernameUpd}
                updType="text"
                updCallback={setUsernameUpdCallback}
              />
              <DataFieldText
                editMode={editMode}
                className="email"
                title="EMail"
                editable={true}
                defaultValue={email}
                updValue={emailUpd}
                updType="email"
                updCallback={setEmailUpdCallback}
              />
              <DataFieldText
                editMode={editMode}
                className="firstname"
                title="Firstname"
                editable={true}
                defaultValue={firstname}
                updValue={firstnameUpd}
                updType="text"
                updCallback={setFirstnameUpdCallback}
              />
              <DataFieldText
                editMode={editMode}
                className="about"
                title="About"
                editable={true}
                defaultValue={about}
                updValue={aboutUpd}
                updType="text"
                updCallback={setAboutUpdCallback}
              />
              <DataFieldDDL
                editMode={editMode}
                className="sex"
                title="Sex"
                editable={true}
                defaultValue={sex}
                updValue={sexUpd}
                options={["m", "f"]}
                updCallback={setSexUpdCallback}
              />
              <DataFieldText
                editMode={editMode}
                className="updated-at"
                title="Profile updated"
                defaultValue={updatedAt}
              />
              <DataFieldText
                editMode={editMode}
                className="created-at"
                title="Profile created"
                defaultValue={createdAt}
              />
            </div>
            {errorHidden ? <></> : <ErrorSection message={errorMessage} />}
            <div className="profile-buttons">
              {editMode ? (
                <>
                  <span className="change-password-btn">
                    <button onClick={handleChangePassword}>
                      Change password
                    </button>
                  </span>
                  <span className="save-btn">
                    <button onClick={handleSave}>Save</button>
                  </span>
                </>
              ) : (
                <>
                  <span className="logout-btn">
                    <button onClick={handleLogout}>Logout</button>
                  </span>
                  <span className="edit-btn">
                    <button onClick={handleEdit}>Edit</button>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Profile };
