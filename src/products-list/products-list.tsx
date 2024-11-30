import React, { useState } from "react";
import { ProductRequest } from "src/products-list/product-list-request";
import { Product } from "src/products-list/interface";

function ProductList() {
  const [productList, setProductList] = useState([] as Array<Product>);
  const displayedList = productList.map((product: Product) => {
    return (
      <li className="product__item" key={product.id}>
        <img className="product__item-img" src={product.img_url} />
        <div className="product__description">
          <h3>Renault Megane</h3>
        </div>
      </li>
    );
  });

  function updateProductsList(newList: Array<Product>) {
    setProductList([...productList, ...newList]);
  }

  const fetchProducts = async () => {
    updateProductsList(await ProductRequest.fetchProducts());
  };

  return (
    <ul
      className="product__list site-horizontal-padding"
      onClick={fetchProducts}
    >
      {displayedList}
    </ul>
  );
}

export { ProductList };
