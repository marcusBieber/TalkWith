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
export const SocketProvider = ({ children, username }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    // Verbindung herstellen und im Custom-Hook speichern
    socketRef.current.on("connect", () => {
      console.log("Verbindung hergestellt!");
      setSocket(socketRef.current);
      // Benutzernamen an den Server senden
      socketRef.current.emit("set_username", username);
    });
    // Fehlerbehandlung
    socketRef.current.on("conection_error", (err) => {
      console.error(`Verbindungsfehler: ${err.message}`);
    });
    // trennen der Verbindung wenn Komponente "unmounted" wird
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
