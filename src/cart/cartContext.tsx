import React, { createContext, useContext, useState } from "react";
import { CartContextManager, ContextCartState } from "src/cart/cartManager";
import { Product } from "src/products-list/interface";

interface CartContextType {
  cartContextManager: CartContextManager;
}

const CartContext = createContext({} as CartContextType);
const cartContextManager = new CartContextManager();

function CartProvider({ children }: { children: React.ReactNode }) {
  const [productCartList, setProductCartList] = useState([] as Array<Product>);
  const state = {
    list: productCartList,
    updaterFunction: setProductCartList,
  } as ContextCartState;

  cartContextManager.setState(state);

  return (
    <CartContext.Provider value={{ cartContextManager }}>
      {children}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}

export { CartProvider, useCartContext };
