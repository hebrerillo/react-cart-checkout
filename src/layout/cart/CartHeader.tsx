import React from "react";
import { CartModalManager } from "src/cart/cartModalManager";

interface CartHeaderProps {
  cartModalManager: CartModalManager;
}

function CartHeader(props: CartHeaderProps) {
  return (
    <div className="cart-modal__header">
      <h3 className="cart-modal__header-title">order</h3>
      <span
        className="close-icon"
        onClick={props.cartModalManager.hide.bind(props.cartModalManager)}
      ></span>
    </div>
  );
}

export { CartHeader };
