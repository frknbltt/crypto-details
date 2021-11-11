import React from "react";
import PropTypes from "prop-types";

const Cards = ({ color, count, caption }) => {
  return (
    <div
      style={{
        background: color,
        padding: "20px ",
        color: "white",
        width: "20%",
        minWidth: "260px",
      }}
    >
      <h1 style={{ color: "white", fontSize: "50px", marginBottom: "0" }}>
        {count}
      </h1>
      <p style={{ color: "white", marginBottom: "0" }}>{caption}</p>
    </div>
  );
};
Cards.propTypes = {
  color: PropTypes.string,
  count: PropTypes.string,
  caption: PropTypes.string,
};
export default Cards;
