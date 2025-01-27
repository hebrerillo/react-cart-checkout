import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import { GlobalProvider } from "src/global/global";
import { CartProvider } from "src/cart/cartContext";

import "../styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <GlobalProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </GlobalProvider>,
);
