import React from "react";
import { CartManager } from "src/cart/cartManager";

interface ProductListLayoutProps {
  cartManager: CartManager;
}

function ProductList(props: ProductListLayoutProps) {
  const productList = props.cartManager.getList().map((product) => {
    return (
      <li key={product.id}>
        {product.name} x{product.amount}
        <span
          onClick={props.cartManager.addProduct.bind(
            props.cartManager,
            product,
          )}
        >
          Increase
        </span>
        <span
          onClick={props.cartManager.decreaseProduct.bind(
            props.cartManager,
            product,
          )}
        >
          Decrease
        </span>
      </li>
    );
  });

  return <ul>{productList}</ul>;
}

export { ProductList, ProductListLayoutProps };
