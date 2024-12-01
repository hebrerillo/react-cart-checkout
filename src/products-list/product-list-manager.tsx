import React, { createRef } from "react";
import { Product } from "src/products-list/interface";
import { HTTPRequest, RequestParams } from "src/utilities/request";

export class ProductListManager {
  //@ts-ignore
  private fetchProductsCallback: Function; //Callback to be executed when the last product is intersecting
  private observer!: IntersectionObserver;
  private productsRef: Array<React.RefObject<HTMLLIElement>>;

  constructor(fetchProductsCallback: Function) {
    this.fetchProductsCallback = fetchProductsCallback;
    this.productsRef = [];
    this.initializeObserver();
  }

  private initializeObserver() {
    const observerOptions = {
      root: null,
      thresold: 0,
      rootMargin: "0px 0px 0px 0px",
    };

    this.observer = new IntersectionObserver(
      this.observerCallback.bind(this),
      observerOptions,
    );
  }

  /**
   * Gets executed when items are intersecting
   */
  private observerCallback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        if (entry.target === this.productsRef.slice(-1)[0].current) {
          this.fetchProductsCallback();
        }
      }
    });
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
   * Observes the products HTML elements in the list.
   */
  public observeProductsElements() {
    this.productsRef.forEach(
      (productRef) =>
        productRef.current && this.observer?.observe(productRef.current),
    );
  }

  public unobserveProductsElements() {
    this.observer?.disconnect();
  }

  /**
   * Render the list of products
   */
  public renderList(productList: Array<Product>): React.JSX.Element[] {
    for (let i = 0; i < productList.length; i++) {
      this.productsRef.push(createRef<HTMLLIElement>());
    }

    return productList.map((product, index) => {
      return (
        <li
          className="product__item"
          key={product.id}
          ref={this.productsRef[index]}
          data-id={product.id}
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
