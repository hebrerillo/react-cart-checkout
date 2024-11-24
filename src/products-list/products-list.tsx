import React, { useState } from "react";
import { ListInterface } from "src/products-list/interface";

function ProductList() {
  const initialValues = {
    list: [
      {
        id: "1",
        img_url: "https://images.unsplash.com/photo-1721332153370-56d7cc352d63",
      },
    ],
  } as ListInterface;
  const [productList, _] = useState(initialValues as ListInterface);
  const displayedList = productList.list.map((product) => {
    return (
      <li className="product__item" key={product.id}>
        <img
          className="product__item-img"
          src="https://images.unsplash.com/photo-1721332153370-56d7cc352d63"
        />
        <div className="product__description">
          <h3>Renault Megane</h3>
        </div>
      </li>
    );
  });

  //  function updateProductsList(newList: Array<Product>) {
  //    setProductList([...productList, ...newList]);
  //  }

  return (
    <ul className="product__list site-horizontal-padding">{displayedList}</ul>
  );
}

export { ProductList };
