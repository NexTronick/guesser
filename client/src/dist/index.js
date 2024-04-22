"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./index.css");
var App_1 = require("./App");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var store_1 = require("./app/store");
var react_cookie_1 = require("react-cookie");
var react_router_dom_1 = require("react-router-dom");
//config of axios
axios_1["default"].defaults.baseURL =
    process.env.REACT_ENV_BACKEND_URL || "https://guessapi.natrajpadwani.site";
axios_1["default"].defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
axios_1["default"].defaults.headers.get["Access-Control-Allow-Origin"] = "*";
axios_1["default"].defaults.headers.post["Access-Control-Allow-Origin"] = "*";
var root = client_1["default"].createRoot(document.getElementById("root"));
root.render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(react_cookie_1.CookiesProvider, null,
        react_1["default"].createElement(react_redux_1.Provider, { store: store_1["default"] },
            react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
                react_1["default"].createElement(App_1["default"], null))))));
