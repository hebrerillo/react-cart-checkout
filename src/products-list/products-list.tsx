import React from "react";

function ProductsList() {
  return (
    <ul className="product__list site-horizontal-padding">
      <li className="product__item">
        <img className="product__item-img" src="https://images.unsplash.com/photo-1721332153370-56d7cc352d63" />
        <div className="product__description">
          <h3>Renault Megane</h3>
        </div>
      </li>
    </ul>
  );
}

export { ProductsList };
