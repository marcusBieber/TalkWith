import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";

// "Container" für die Socket-Verbindung
const SocketContext = createContext();

// Custom-Hook für Zugriff auf Socket-Verbindung
export const useSocket = () => useContext(SocketContext);

// initialisieren einer einzelnen beständigen Verbindung
// und speichern im SocketContext
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://Localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("Verbindung hergestellt!");
      setSocket(socketRef.current);
    });

    socketRef.current.on("conection_error", (err) => {
      console.error(`Verbindungsfehler: ${err.message}`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
