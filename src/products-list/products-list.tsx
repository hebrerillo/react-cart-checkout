import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ProductListManager,
  ProductsState,
} from "src/products-list/product-list-manager";
import { Product } from "src/products-list/interface";
import { useGlobalContext } from "src/context/global";

const listManager = new ProductListManager();

function ProductList() {
  const { globalContextManager } = useGlobalContext();
  const productsRef = useRef<Array<HTMLLIElement>>([]);
  const productsRefCallback = useCallback((element: HTMLLIElement) => {
    productsRef.current?.push(element);
  }, []);

  const [productList, setProductList] = useState([] as Array<Product>);
  const state = {
    list: productList,
    updaterFunction: setProductList,
    globalContext: globalContextManager,
  } as ProductsState;

  listManager.setState(state);

  useEffect(() => {
    listManager.afterRender(productsRef.current);
  });

  useEffect(() => {
    listManager.fetchProducts();
  }, []);

  return (
    <ul className="product__list site-horizontal-padding">
      {listManager.renderList(productList, productsRefCallback)}
    </ul>
  );
}

export { ProductList };
