import React, { useRef } from "react";
import { useGlobalContext } from "src/global/global";
import { CartModal } from "src/layout/cart/cartModal";
import { useCartContext } from "src/cart/cartContext";

function Header() {
  const { globalContextManager } = useGlobalContext();
  const { cartContextManager } = useCartContext();
  const header = useRef<HTMLElement>(null);
  const cartModalManager = cartContextManager.getModalManager();
  globalContextManager.setSiteHeader(header);

  return (
    <header className="site-header site-horizontal-padding" ref={header}>
      <span className="site-header__left-arrow">&larr;</span>
      <a className="site-header__logo" href="#">
        <img src="/img/logo.svg" />
      </a>
      <CartModal />
      <div onClick={cartModalManager.show.bind(cartModalManager)}>
        open cart
      </div>
    </header>
  );
}

export default Header;
