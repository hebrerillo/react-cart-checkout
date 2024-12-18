import React, { useRef } from "react";
import { useGlobalContext } from "src/context/global";

function Header() {
  const { globalContextManager } = useGlobalContext();
  const header = useRef<HTMLElement>(null);
  globalContextManager.setSiteHeader(header);

  return (
    <header className="site-header site-horizontal-padding" ref={header}>
      <span className="site-header__left-arrow">&larr;</span>
      <a className="site-header__logo" href="#">
        <img src="/img/logo.svg" />
      </a>
    </header>
  );
}

export default Header;
