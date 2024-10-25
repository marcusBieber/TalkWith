import React from "react"; // Import React
import { render, fireEvent, screen } from "@testing-library/react"; // Import testing utilities
import { ColorContext } from "./ColorSwitcher"; // Import ColorContext for testing
import { SocketProvider } from "./SocketProvider"; // Import SocketProvider for testing
import TextInput from "./TextInput"; // Import TextInput component


// Mock the socket instance// Create a mock function for emit

// Mock the socket instance
const mockSocket = {
  emit: jest.fn(),
};

// Mock the useSocket hook
jest.mock("./SocketProvider", () => ({
  useSocket: () => mockSocket,
  SocketProvider: ({ children }) => <div>{children}</div>,
}));

// Mock ColorContext provider value
const mockContextValue = { darkMode: false }; // Set dark mode to false or true as needed

//Render function for testing
const renderComponent = () => {
  return render(
    <ColorContext.Provider value={mockContextValue}>
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

  test("sends a message on button click", () => {
    renderComponent(); // Render the component

    // Simulate typing a message
    const inputField = screen.getByPlaceholderText("schreib' eine Nachricht...");
    fireEvent.change(inputField, {
      target: { value: "Hello World" }, // Change the value of the input field
    });

    // Simulate button click
    fireEvent.click(screen.getByText("Senden")); // Click the button

    // Check if socket emit is called with correct data
    expect(mockSocket.emit).toHaveBeenCalledWith("send_message", expect.objectContaining({
      user: "testUser", // Check if user is correct
      text: "Hello World", // Check if text is correct
      timestamp: expect.any(String), // Check if timestamp is a string
    }));

    // Ensure the message field is cleared after sending
    expect(inputField.value).toBe(""); // Input field should be empty
  });
});