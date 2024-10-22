import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleColorScheme = () => {
    setDarkMode((changeMode) => !changeMode);
  };

  return (
    <ColorContext.Provider value={{ darkMode, toggleColorScheme }}>
      {children}
    </ColorContext.Provider>
  );
};

const ColorSwitcher = () => {
  const { darkMode, toggleColorScheme } = useContext(ColorContext);

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    borderRadius: '20px',
    border: 'none',
    padding: '5px 20px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease', // Hintergrundfarbwechsel und Hover
    backgroundColor: darkMode ? (isHovered ? "#4a4a4a" : "#565656") : (isHovered ? "#dcdcdc" : "#eaeaea"), // Gleiche Logik wie beim Senden-Button
    color: darkMode ? '#ffffff' : '#565353',
    boxShadow: isHovered
      ? "0px 4px 15px rgba(0, 0, 0, 0.2)"
      : "none",
    transform: `translateY(${isHovered ? '-2px' : '0'})`,
  };


  return (
    <button
      style={buttonStyle}
      className={`btn btn-custom ${darkMode ? "btn-dark" : "btn-light"}`}
      onClick={toggleColorScheme}
      onMouseEnter={() => setIsHovered(true)}  // Hover aktivieren
      onMouseLeave={() => setIsHovered(false)} // Hover deaktivieren
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export { ColorSwitcher, ColorContext };
