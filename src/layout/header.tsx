import React from "react";
import { useGlobalContext } from "src/context/global";

function Header() {
  const { siteHeader } = useGlobalContext();
  return (
    <header
      className="site-header site-horizontal-padding"
      ref={siteHeader}
    >
      <span className="site-header__left-arrow">&larr;</span>
      <a className="site-header__logo" href="#">
        <img src="/img/logo.svg" />
      </a>
    </header>
  );
}

export default Header;
