import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free'
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { MyStore } from "./Redux/MyStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={MyStore}>
    <App />
  </Provider>
);
