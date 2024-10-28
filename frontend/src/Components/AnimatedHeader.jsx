import React, { useEffect, useState } from "react";
import logo from "./kaiwa-removebg-preview (3).png";

const AnimatedHeader = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center mb-0 flex-grow-1  ${
        showHeader ? "slide-in" : ""
      }`}
      style={{
        color: "#000",
        marginBottom: "20px", 
        height: "250px",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      }}>
        {showHeader && (
        <img
          src={logo} // Verwenden Sie die importierte Variable für das Logo
          alt="Logo"
          style={{
            Width: "50px", // Skaliert das Logo responsiv
            height: "auto",
            marginBottom: "20px",
          }}
        />
      )}
    </div>
  );
};

export default AnimatedHeader;
