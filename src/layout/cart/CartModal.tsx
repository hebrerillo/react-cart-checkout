import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CartBody } from "src/layout/cart/CartBody";
import { CartHeader } from "src/layout/cart/CartHeader";
import { useCartContext } from "src/cart/cartContext";

function CartModalContent() {
  const [isVisible, setIsVisible] = useState(false);
  const { cartManager } = useCartContext();
  const cartModalManager = cartManager.getModalManager();

  const state = {
    updaterFunction: setIsVisible,
    isVisible: isVisible,
  };
  cartModalManager.setState(state);

  const visibleModifier = isVisible ? "modal-wrapper--show" : "";

  return (
    <div className={`modal-wrapper ${visibleModifier}`}>
      <div className={`cart-modal`}>
        <CartHeader cartModalManager={cartModalManager} />
        <CartBody />
      </div>
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
