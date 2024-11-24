import React from "react";
import ReactDOM from "react-dom/client";
import Checkout from "src/checkout";
import { GlobalProvider } from "src/context/global";

import "../styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <GlobalProvider>
    <Checkout />
  </GlobalProvider>,
);
