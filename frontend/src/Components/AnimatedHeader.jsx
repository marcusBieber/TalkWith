import React, { useEffect, useState } from "react";

const AnimatedHeader = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <h1
      className={`text-center mb-0 flex-grow-1 ${
        showHeader ? "slide-in" : ""
      }`}
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 100,
        color: "#000",
        marginBottom: "20px", 
      }}
    >
      Wilkommen bei ChatWith!
    </h1>
  );
};

export default AnimatedHeader;
