import React, { useState } from "react";
import { ProductListManager } from "src/products-list/product-list-manager";
import { Product } from "src/products-list/interface";

function ProductList() {
  const [productList, setProductList] = useState([] as Array<Product>);

  function updateProductsList(newList: Array<Product>) {
    setProductList([...productList, ...newList]);
  }

  const fetchProducts = async () => {
    updateProductsList(await ProductListManager.fetchProducts());
  };

  return (
    <ul
      className="product__list site-horizontal-padding"
      onClick={fetchProducts}
    >
      {ProductListManager.renderList(productList)}
    </ul>
  );
}

export { ProductList };
