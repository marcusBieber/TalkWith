// TextInput.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ColorContext } from "./ColorSwitcher";
import { SocketProvider, useSocket } from "./SocketProvider";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton"; // Mock CustomButton component

// Mock the CustomButton component
jest.mock("./CustomButton", () => ({ onClick, children, className }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
));

// Mock the socket instance
const mockSocket = {
  emit: jest.fn(),
};

// Mock useSocket hook
jest.mock("./SocketProvider", () => ({
  useSocket: () => mockSocket,
}));

// Mock ColorContext provider value
const mockContextValue = { darkMode: false };

// Render the component with context and socket
const renderComponent = (darkMode = false) => {
  return render(
    <ColorContext.Provider value={{ darkMode }}>
      <SocketProvider>
        <TextInput username="testUser" />
      </SocketProvider>
    </ColorContext.Provider>
  );
};

describe("TextInput Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  test("renders the input field and button", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("schreib' eine Nachricht...")).toBeInTheDocument();
    expect(screen.getByText("Senden")).toBeInTheDocument();
  });

  test("sends a message on button click", () => {
    renderComponent();

    // Simulate typing a message
    fireEvent.change(screen.getByPlaceholderText("schreib' eine Nachricht..."), {
      target: { value: "Hello World" },
    });

    // Simulate button click
    fireEvent.click(screen.getByText("Senden"));

    // Check if socket emit is called with correct data
    expect(mockSocket.emit).toHaveBeenCalledWith("send_message", expect.objectContaining({
      user: "testUser",
      text: "Hello World",
    }));

    // Ensure the message field is cleared after sending
    expect(screen.getByPlaceholderText("schreib' eine Nachricht...").value).toBe("");
  });

  test("sends a message on Enter key press without Shift", () => {
    renderComponent();

    // Simulate typing a message
    fireEvent.change(screen.getByPlaceholderText("schreib' eine Nachricht..."), {
      target: { value: "Test Enter" },
    });

    // Simulate pressing Enter without Shift
    fireEvent.keyDown(screen.getByPlaceholderText("schreib' eine Nachricht..."), {
      key: "Enter",
      shiftKey: false,
    });

    // Check if socket emit is called with correct data
    expect(mockSocket.emit).toHaveBeenCalledWith("send_message", expect.objectContaining({
      user: "testUser",
      text: "Test Enter",
    }));

    // Ensure the message field is cleared after sending
    expect(screen.getByPlaceholderText("schreib' eine Nachricht...").value).toBe("");
  });

  test("does not send message when Enter is pressed with Shift", () => {
    renderComponent();

    // Simulate typing a message
    fireEvent.change(screen.getByPlaceholderText("schreib' eine Nachricht..."), {
      target: { value: "Shift Enter Test" },
    });

    // Simulate pressing Enter with Shift
    fireEvent.keyDown(screen.getByPlaceholderText("schreib' eine Nachricht..."), {
      key: "Enter",
      shiftKey: true,
    });

    // Check that socket emit was not called
    expect(mockSocket.emit).not.toHaveBeenCalled();
  });

  test("applies dark mode classes when darkMode is true", () => {
    renderComponent(true); // Set darkMode to true

    // Check that the textarea and button have dark mode styles
    expect(screen.getByPlaceholderText("schreib' eine Nachricht...")).toHaveClass("dark");
    expect(screen.getByText("Senden")).toHaveClass("btn-dark");
  });

  test("applies light mode classes when darkMode is false", () => {
    renderComponent(false); // Set darkMode to false

    // Check that the textarea and button have light mode styles
    expect(screen.getByPlaceholderText("schreib' eine Nachricht...")).not.toHaveClass("dark");
    expect(screen.getByText("Senden")).toHaveClass("btn-light");
  });
});