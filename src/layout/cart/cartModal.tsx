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
        <ul>{productList}</ul>
        <span>Total price: {cartContextManager.getTotalPrice()}</span>
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
