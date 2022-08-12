import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HeaderFixed from "./components/Header/HeaderFixed";
import MenuFixed from "./components/Header/MenuFixed";

describe("Checking the Display of Components", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("renders Home components", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
    const linkElement = screen.getByText(/filmx/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders Menu", () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <MenuFixed />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
    const linkElement = screen.getByText(/home/i);
    expect(linkElement).toBeInTheDocument();
  });
});
