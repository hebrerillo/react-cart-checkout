import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/app";
import { GlobalProvider } from "src/context/global";

import "../styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
