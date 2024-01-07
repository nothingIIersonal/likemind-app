import React from "react";

function ErrorSection(props) {
  return (
    <>
      <section className="error-section">
        <p>{props.message}</p>
      </section>
    </>
  );
}

export { ErrorSection };
