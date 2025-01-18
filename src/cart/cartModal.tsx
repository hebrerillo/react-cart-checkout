import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useCartContext } from "src/cart/cartContext";

function CartModalContent() {
  const [isVisible, setIsVisible] = useState(false);
  const { cartContextManager } = useCartContext();
  const cartModalManager = cartContextManager.getModalManager();

  const state = {
    updaterFunction: setIsVisible,
    isVisible: isVisible,
  };
  cartModalManager.setState(state);

  const visibleModifier = isVisible ? "cart-modal--show" : "";
  return (
    <div className={`cart-modal ${visibleModifier}`}>
      <p></p>
      <span onClick={cartModalManager.hide.bind(cartModalManager)}>Close</span>
    </div>
  );
}

function CartModal() {
  return createPortal(
    <CartModalContent />,
    document.querySelector("[data-cart-modal]")!,
  );
}

export { CartModal };
