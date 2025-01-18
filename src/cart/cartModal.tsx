import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useCartContext } from "src/cart/cartContext";

function CartModalContent() {
  const [isVisible, setIsVisible] = useState(false);
  const { cartContextManager } = useCartContext();
  const cartModalManager = cartContextManager.getModalManager();

  const productList = cartContextManager.getList()?.map((product) => {
    return (
      <li key={product.id}>
        {product.name} x{product.amount}
        <span
          onClick={cartContextManager.addProduct.bind(
            cartContextManager,
            product,
          )}
        >
          Increase
        </span>
        <span
          onClick={cartContextManager.decreaseProduct.bind(
            cartContextManager,
            product,
          )}
        >
          Decrease
        </span>
      </li>
    );
  });

  const state = {
    updaterFunction: setIsVisible,
    isVisible: isVisible,
  };
  cartModalManager.setState(state);

  const visibleModifier = isVisible ? "cart-modal--show" : "";
  return (
    <div className={`cart-modal ${visibleModifier}`}>
      <ul>{productList}</ul>
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
