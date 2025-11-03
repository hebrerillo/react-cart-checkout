import React from "react";
import { Product } from "src/products-list/interface";
import { useCartContext } from "src/cart/cartContext";
import { ProductPicture } from "./product-item-picture";

export interface ProductItemProps {
  product: Product;
  refCallback: React.LegacyRef<HTMLLIElement>;
}

export function ProductItem(props: ProductItemProps) {
  const { cartManager } = useCartContext();

  const addProductToCart = cartManager.addProduct.bind(
    cartManager,
    props.product,
  );

  return (
    <li
      className="product__item"
      ref={props.refCallback}
      data-id={props.product.id}
    >
      <ProductPicture product={props.product} />
      <div className="product__description">
        <h3>{props.product.name}</h3>
      </div>
      <button className="product__item-add-button" onClick={addProductToCart}>
        Add
      </button>
    </li>
  );
}
