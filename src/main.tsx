import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import CoinContextProvider from "./context/CoinContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Router>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </Router>
  </React.StrictMode>
);
