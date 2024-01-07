import React from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <div className="index-container">
        <h2>Get like-minded!</h2>
        <br />
        <Link to="/register" className="link-click">
          {"Don't have an account? Register here"}
        </Link>
        <br />
        <br />
        <p className="index-or"> - OR - </p>
        <Link to="/login" className="link-click">
          Already have an account? Login here
        </Link>
      </div>
    </>
  );
}

export { Index };
