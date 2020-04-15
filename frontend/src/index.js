import React from "react";
import ReactDOM from "react-dom";
import NetworkDetector from "./components/NetworkDetector";
import { ModalContextProvider } from "./components/ModalContext";
import App from "./App";
import "./index.css";
ReactDOM.render(
  <ModalContextProvider>
    <NetworkDetector>
      <App />
    </NetworkDetector>
  </ModalContextProvider>,
  document.getElementById("root")
);
