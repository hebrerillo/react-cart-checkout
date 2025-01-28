import React from "react";
import { EmptyCartMessage } from "src/layout/cart/EmptyMessage";
import { ProductList } from "src/layout/cart/ProductList";
import { useCartContext } from "src/cart/cartContext";

function CartBody() {
  const { cartManager } = useCartContext();
  return (
    <div>
      <div
        className={`fadeable ${cartManager.isEmpty() ? "fade-in" : "fade-out"}`}
      >
        <ProductList cartManager={cartManager} />
      </div>
      <div
        className={`fadeable ${!cartManager.isEmpty() ? "fade-in" : "fade-out"}`}
      >
        <EmptyCartMessage />
      </div>
    </div>
  );
}

export { CartBody };
