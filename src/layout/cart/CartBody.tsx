import React from "react";
import { EmptyCartMessage } from "src/layout/cart/EmptyMessage";
import { ProductList } from "src/layout/cart/ProductList";
import { useCartContext } from "src/cart/cartContext";

function CartBody() {
  const { cartManager } = useCartContext();
  return (
    <div>
      <div className={cartManager.isEmpty() ? "d-none" : ""}>
        <ProductList cartManager={cartManager} />
      </div>
      <div className={!cartManager.isEmpty() ? "d-none" : ""}>
        <EmptyCartMessage />
      </div>
    </div>
  );
}

export { CartBody };
