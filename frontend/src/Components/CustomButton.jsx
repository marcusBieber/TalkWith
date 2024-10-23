import React, { useContext, useState } from "react";
import { ColorContext } from "./ColorSwitcher";

const CustomButton = ({ onClick, children, type = "button" }) => {

  const { darkMode } = useContext(ColorContext); // Context verwenden
  const [isHovered, setIsHovered] = useState(false); // Zustand für Hover

  const buttonStyle = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    borderRadius: '20px',
    border: 'none',
    padding: '5px 20px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    backgroundColor: darkMode 
      ? (isHovered ? "#4a4a4a" : "#565656") 
      : (isHovered ? "#dcdcdc" : "#eaeaea"), // Hintergrundfarbe basierend auf dem Zustand
    color: darkMode ? '#ffffff' : '#565353',
    boxShadow: isHovered ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "none",
    transform: `translateY(${isHovered ? '-2px' : '0'})`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={buttonStyle} // Inline-Styling verwenden
      onMouseEnter={() => setIsHovered(true)}  // Hover aktivieren
      onMouseLeave={() => setIsHovered(false)} // Hover deaktivieren
    >
      {children}
    </button>
  );
};

export default CustomButton;
