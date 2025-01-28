import React from "react";
import { CartManager } from "src/cart/cartManager";
import { Product } from "src/products-list/interface";

interface ProductListLayoutProps {
  cartManager: CartManager;
}

function ProductList(props: ProductListLayoutProps) {
  function handleTransitionEnd(product: Product, event: React.TransitionEvent) {
    const target = event.target as HTMLElement;
    if (target.hasAttribute("data-to-delete")) {
      props.cartManager.decreaseProduct(product);
    }
  }

  function decreaseProduct(
    product: Product,
    event: React.MouseEvent<HTMLSpanElement>,
  ) {
    if (product.amount === 1) {
      const target = event.target as HTMLElement;
      const parentElement = target.closest("li");
      if (!parentElement) {
        return;
      }

      parentElement.style.maxHeight = `${parentElement.scrollHeight}px`;
      parentElement.offsetHeight;
      parentElement.style.maxHeight = `0px`;
      parentElement.style.overflow = `hidden`;
      parentElement.dataset.toDelete = "1";
    } else {
      props.cartManager.decreaseProduct(product);
    }
  }

  const productList = props.cartManager.getList().map((product) => {
    return (
      <li
        className="cart-modal__item-product collapsable"
        key={product.id}
        onTransitionEnd={handleTransitionEnd.bind(null, product)}
      >
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
            onClick={decreaseProduct.bind(null, product)}
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
