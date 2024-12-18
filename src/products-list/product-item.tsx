import React from "react";
import { Product } from "src/products-list/interface";

export interface ProductItemProps {
  product: Product;
  refCallback: any;
}

export function ProductItem(props: ProductItemProps) {
  return (
    <li
      className="product__item"
      ref={props.refCallback}
      data-id={props.product.id}
    >
      <img className="product__item-img" src={props.product.desktop_url} />
      <div className="product__description">
        <h3>{props.product.name}</h3>
      </div>
    </li>
  );
}
