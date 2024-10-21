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

  return (
    <button
      className={`btn btn-custom ${darkMode ? "btn-light" : "btn-dark"}`}
      onClick={toggleColorScheme}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export { ColorSwitcher, ColorContext };
