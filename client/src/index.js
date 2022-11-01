import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserAuth from "./context/UserAuth";
import Cart from "./context/Cart";
import axios from "axios";
import { SWRConfig } from "swr";

axios.defaults.baseURL = "http://localhost:8000/api";

const fetcher = (...args) => axios.get(...args).then(response => response.data);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <SWRConfig value={{ suspense: true, fetcher: fetcher }}>
        <UserAuth>
            <Cart>
                <App />
            </Cart>
        </UserAuth>
    </SWRConfig>
);

reportWebVitals();
