import React from "react";
import { useContext, useState } from "react";

const CustomButton = ({ onClick, children, style, type = "button", darkMode = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-custom ${darkMode ? 'btn-custom-dark' : 'btn-custom-light'}`}
      style={{ ...style }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
