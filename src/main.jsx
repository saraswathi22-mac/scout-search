import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reducer, { initialState } from "./context/searchReducer";
import { StateProvider } from "./context/StateProvider";
import { ThemeProvider } from "./context/ThemeContext";
import "./theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>
);
