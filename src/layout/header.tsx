import React from "react";

function Header() {
  return (
    <header className="site-header site-horizontal-padding">
      <span className="site-header__left-arrow">&larr;</span>
      <a className="site-header__logo" href="#">
        <img src="/img/logo.svg" />
      </a>
    </header>
  );
}

export default Header;
