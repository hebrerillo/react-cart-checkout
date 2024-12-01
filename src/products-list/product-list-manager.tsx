import React, { useRef } from "react";
import { Product } from "src/products-list/interface";
import { HTTPRequest, RequestParams } from "src/utilities/request";

export class ProductListManager {
  private lastProductRef: React.RefObject<HTMLLIElement>; //The last product in the list
  private observerCallback: Function; //Callback to be executed when the last product is intersecting
  private observer!: IntersectionObserver;

  constructor(observerCallback: Function) {
    this.observerCallback = observerCallback;
    this.lastProductRef = useRef() as React.RefObject<HTMLLIElement>;
    this.initializeObserver();
  }

  private initializeObserver() {
    const observerOptions = {
      root: null,
      thresold: 0,
      rootMargin: "0px 0px 0px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries.length > 0 && entries[0].isIntersecting) {
        console.log("intersecting", entries[0]);
        this.observerCallback();
      }
    }, observerOptions);
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

  /**
   * Observes the last product in the list. When the last product
   * is intersecting, a new request for more products is performed.
   */
  public observeLastProduct() {
    this.lastProductRef?.current &&
      this.observer.observe(this.lastProductRef?.current);
  }

  /**
   * Unobserves the last product
   */
  public unobserveLastProduct() {
    this.lastProductRef?.current &&
      this.observer.unobserve(this.lastProductRef?.current);
  }

  /**
   * Render the list of products
   */
  public renderList(productList: Array<Product>): React.JSX.Element[] {
    return productList.map((product, index) => {
      return (
        <li
          className="product__item"
          key={product.id}
          ref={index === productList.length - 1 ? this.lastProductRef : null}
        >
          <img className="product__item-img" src={product.img_url} />
          <div className="product__description">
            <h3>{product.name}</h3>
          </div>
        </li>
      );
    });
  }
}
