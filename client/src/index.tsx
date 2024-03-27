import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./app/store";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
//config of axios
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
