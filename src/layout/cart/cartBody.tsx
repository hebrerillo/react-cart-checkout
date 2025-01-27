import React from "react";
import { EmptyCartMessage } from "src/layout/cart/emptyMessage";
import { ProductList } from "src/layout/cart/ProductList";
import { useCartContext } from "src/cart/cartContext";

function CartBody() {
  const { cartContextManager } = useCartContext();
  return (
    <div>
      {" "}
      {!cartContextManager.isEmpty() ? (
        <ProductList cartManager={cartContextManager} />
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  );
}

export { CartBody };
