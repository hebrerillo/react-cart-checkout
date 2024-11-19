import React from "react";
import { useGlobalContext } from "../context/global";

function Header() {
  const { checkoutHeader } = useGlobalContext();
  return (
    <header
      className="site-header site-horizontal-padding"
      ref={checkoutHeader}
    >
      <span className="site-header__left-arrow">&larr;</span>
      <a className="site-header__logo" href="#">
        <img src="/img/logo.svg" />
      </a>
    </header>
  );
}

export default Header;
