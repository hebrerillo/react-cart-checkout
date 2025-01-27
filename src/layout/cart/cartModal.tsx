import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CartBody } from "src/layout/cart/cartBody";
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

  const visibleModifier = isVisible ? "modal-wrapper--show" : "";

  return (
    <div className={`modal-wrapper ${visibleModifier}`}>
      <div className={`cart-modal`}>
        <div className="cart-modal__header">
          <h3 className="cart-modal__header-title">order</h3>
          <span
            className="close-icon"
            onClick={cartModalManager.hide.bind(cartModalManager)}
          ></span>
        </div>
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
