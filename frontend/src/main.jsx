import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { HabitProvider } from "./pages/HabitContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HabitProvider>
        <App />
      </HabitProvider>
    </BrowserRouter>
  </React.StrictMode>
);
