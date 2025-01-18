import React, { createContext, useContext, useState } from "react";
import { CartManager, ContextCartState } from "src/cart/cartManager";
import { Product } from "src/products-list/interface";

interface CartContextType {
  cartContextManager: CartManager;
}

const CartContext = createContext({} as CartContextType);
const cartContextManager = new CartManager();

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
