import React, { useContext } from "react";
import GlobalContext from "../context/global";

function Header() {
  const { checkoutHeader } = useContext(GlobalContext);
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
