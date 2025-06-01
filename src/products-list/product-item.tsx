import React from "react";
import { Product } from "src/products-list/interface";
import { useCartContext } from "src/cart/cartContext";
import { ProductPicture } from "./product-item-picture";

export interface ProductItemProps {
  product: Product;
  refCallback: any;
}

export function ProductItem(props: ProductItemProps) {
  const src = props.product.intersects ? props.product.desktop_url : "";
  const { cartContextManager } = useCartContext();

  const addProductToCart = cartContextManager.addProduct.bind(
    cartContextManager,
    props.product,
  );

  return (
    <li
      className="product__item"
      ref={props.refCallback}
      data-id={props.product.id}
    >
      <ProductPicture />
      <img
        className="product__item-img"
        data-src={props.product.desktop_url}
        src={src}
      />
      <div className="product__description">
        <h3>{props.product.name}</h3>
      </div>
      <button className="product__item-add-button" onClick={addProductToCart}>
        Add
      </button>
    </li>
  );
}
