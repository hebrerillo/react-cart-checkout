import React, { useRef } from "react";
import { Product } from "src/products-list/interface";
import { HTTPRequest, RequestParams } from "src/utilities/request";

export class ProductListManager {
  private lastProductRef: React.RefObject<HTMLLIElement>;

  constructor() {
    this.lastProductRef = useRef() as React.RefObject<HTMLLIElement>;
  }

  /**
   * Performs an asynchronous request to fetch products
   */
  public async fetchProducts() {
    let result = [] as Array<Product>;

    const successFunc = (resultRequest: Array<Product>) => {
      result = resultRequest;
    };

    const params: RequestParams = {
      url: "http://127.0.0.1/react-test-app1/php/products_list.php",
      successFunc: successFunc,
    };

    await HTTPRequest.performRequest(params);
    return result;
  }

  public render() {
    const observerOptions = {
      root: null,
      thresold: 0,
      rootMargin: "0px 0px 0px 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      console.log("observer entries", entries);
    }, observerOptions);

    this.lastProductRef?.current &&
      observer.observe(this.lastProductRef?.current);
    console.log("observing", this.lastProductRef);
  }

  /**
   * Render the list of products
   */
  public renderList(productList: Array<Product>): React.JSX.Element[] {
    return productList.map((product, index) => {
      if (index === productList.length - 1) {
        return (
          <li
            className="product__item"
            key={product.id}
            ref={this.lastProductRef}
          >
            <img className="product__item-img" src={product.img_url} />
            <div className="product__description">
              <h3>{product.name}</h3>
            </div>
          </li>
        );
      } else {
        return (
          <li className="product__item" key={product.id}>
            <img className="product__item-img" src={product.img_url} />
            <div className="product__description">
              <h3>{product.name}</h3>
            </div>
          </li>
        );
      }
    });
  }
}
