import React from "react";
import { EmptyCartMessage } from "src/layout/cart/EmptyMessage";
import { ProductList } from "src/layout/cart/ProductList";
import { useCartContext } from "src/cart/cartContext";

function CartBody() {
  const { cartManager } = useCartContext();
  return (
    <div>
      {!cartManager.isEmpty() ? (
        <ProductList cartManager={cartManager} />
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  );
}

export { CartBody };
