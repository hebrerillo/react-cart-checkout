import React, { useState, useEffect } from "react";
import { ProductListManager } from "src/products-list/product-list-manager";
import { Product } from "src/products-list/interface";

function ProductList() {
  const [productList, setProductList] = useState([] as Array<Product>);
  const listManager = new ProductListManager(fetchProducts);

  function updateProductsList(newList: Array<Product>) {
    setProductList([...productList, ...newList]);
  }

  async function fetchProducts() {
    //TODO: quitar el await
    updateProductsList(await listManager.fetchProducts());
  }

  useEffect(() => {
    listManager.observeProductsElements();
    return () => {
      listManager.unobserveProductsElements();
    };
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ul className="product__list site-horizontal-padding">
      {listManager.renderList(productList)}
    </ul>
  );
}

export { ProductList };
