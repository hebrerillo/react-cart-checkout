import React, { useRef, useCallback } from "react";
import { useGlobalContext } from "src/context/global";
import { Product } from "src/products-list/interface";
import { ProductItem } from "src/products-list/product-item";
import { HTTPRequest, RequestParams } from "src/utilities/request";

export class ProductListManager {
  private fetchProductsCallback: Function; //Callback to be executed when the last product is intersecting
  private observer!: IntersectionObserver;
  private productsRef: React.RefObject<Array<HTMLLIElement>>;
  private productsRefCallback: Function;

  constructor(fetchProductsCallback: Function) {
    this.fetchProductsCallback = fetchProductsCallback;
    this.productsRef = useRef([]);
    this.initializeObserver();
    this.productsRefCallback = useCallback((element: HTMLLIElement) => {
      this.productsRef.current?.push(element);
    }, []);
  }

  private initializeObserver() {
    const { globalContextManager } = useGlobalContext();
    const observerOptions = {
      root: null,
      thresold: 0,
      rootMargin: `-${globalContextManager.getSiteHeaderHeight()}px 0px 0px 0px`,
    };

    this.observer = new IntersectionObserver(
      this.observerCallback.bind(this),
      observerOptions,
    );
  }

  /**
   * Executed to clean up the product list component
   */
  public cleanUp(): void {
    this.unobserveProductsElements();
  }

  /**
   * Executed after the product list has been rendered
   */
  public afterRender(): void {
    this.observeProductsElements();
  }

  /**
   * Gets executed when items are intersecting
   */
  private observerCallback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        if (entry.target === this.productsRef.current?.slice(-1)[0]) {
          this.fetchProductsCallback();
        }
      } else {
        const domRect = entry.boundingClientRect;
        if (domRect.top <= 0) {
          console.log("Hides from the top", entry, domRect.top);
        } else {
          console.log("Hides from the bottom", entry, domRect.top);
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
      url: "http://localhost:8082/carslist",
      successFunc: successFunc,
    };

    await HTTPRequest.performRequest(params);
    return result;
  }

  /**
   * Observes the products HTML elements in the list.
   */
  private observeProductsElements() {
    this.productsRef.current?.forEach(
      (product) => product && this.observer?.observe(product),
    );
  }

  /**
   * Unobserves the products elements
   */
  private unobserveProductsElements() {
    this.observer?.disconnect();
  }

  /**
   * Render the list of products
   */
  public renderList(productList: Array<Product>): React.JSX.Element[] {
    return productList.map((product) => {
      return (
        <ProductItem
          key={product.id}
          product={product as Product}
          refCallback={this.productsRefCallback.bind(this)}
        />
      );
    });
  }
}
