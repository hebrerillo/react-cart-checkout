import React from "react";
import { CartManager } from "src/cart/cartManager";

interface ProductListLayoutProps {
  cartManager: CartManager;
}

function ProductList(props: ProductListLayoutProps) {
  const productList = props.cartManager.getList().map((product) => {
    return (
      <li className="cart-modal__item-product" key={product.id}>
        <picture className="cart-modal__item-picture">
          <img src={product.desktop_url} />
        </picture>
        {product.name} x{product.amount}
        <div className="cart-modal__amount-control-wrapper">
          <span
            className="cart-modal__amount-control"
            onClick={props.cartManager.addProduct.bind(
              props.cartManager,
              product,
            )}
          >
            +
          </span>
          <span
            className="cart-modal__amount-control"
            onClick={props.cartManager.decreaseProduct.bind(
              props.cartManager,
              product,
            )}
          >
            -
          </span>
        </div>
      </li>
    );
  });

  return <ul>{productList}</ul>;
}

export { ProductList, ProductListLayoutProps };
