import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  const setActive = ({ isActive }) =>
    isActive ? "link-click-active" : "link-click";

  const authorized = props.authorized;

  return (
    <>
      <header className="header">
        <div className="menubar">
          <span className="left-span">
            <NavLink to="/profile" className="logo-link-click">
              LikeMind
            </NavLink>
          </span>
          <span className="right-span">
            {authorized ? (
              <></>
            ) : (
              <NavLink to="/login" className={setActive}>
                LogIn
              </NavLink>
            )}
            {authorized ? (
              <></>
            ) : (
              <NavLink to="/register" className={setActive}>
                Register
              </NavLink>
            )}
            <NavLink to="/profile" className={setActive}>
              Profile
            </NavLink>
            <NavLink to="/map" className={setActive}>
              Map
            </NavLink>
          </span>
        </div>
        <hr />
      </header>
    </>
  );
}

export { Header };
