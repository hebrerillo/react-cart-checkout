import React, { createContext, useContext, useState } from "react";
import { CartManager, ContextCartState } from "src/cart/cartManager";
import { Product } from "src/products-list/interface";

interface CartContextType {
  cartManager: CartManager;
}

const CartContext = createContext({} as CartContextType);
const cartManager = new CartManager();

function CartProvider({ children }: { children: React.ReactNode }) {
  const [productCartList, setProductCartList] = useState([] as Array<Product>);
  const state = {
    list: productCartList,
    updaterFunction: setProductCartList,
  } as ContextCartState;

  cartManager.setState(state);

  return (
    <CartContext.Provider value={{ cartManager }}>
      {children}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}

export { CartProvider, useCartContext };
