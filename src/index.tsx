import React from "react";
import ReactDOM from "react-dom/client";
import Checkout from "./Checkout";
import { GlobalProvider } from "./context/global";

import "../styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <GlobalProvider>
    <Checkout />
  </GlobalProvider>,
);
