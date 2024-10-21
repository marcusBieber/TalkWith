import React from "react";

const CustomButton = ({ onClick, children, style, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-custom btn-custom-light"
      style={{ ...style }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
