import React, { useRef, useCallback } from "react";
import { Product } from "src/products-list/interface";
import { ProductItem } from "src/products-list/product-item";
import { HTTPRequest, RequestParams } from "src/utilities/request";
import { ProductsObserver } from "src/products-list/products-observer";

export class ProductListManager {
  private productsRef: React.RefObject<Array<HTMLLIElement>>;
  private productsRefCallback: Function;
  private productsObserver: ProductsObserver | null;

  constructor(fetchProductsCallback: Function) {
    this.productsObserver = null;
    this.productsRef = useRef([]);
    this.productsRefCallback = useCallback((element: HTMLLIElement) => {
      this.productsRef.current?.push(element);
    }, []);
    this.productsObserver = new ProductsObserver(fetchProductsCallback);
  }

  /**
   * Executed to clean up the product list component
   */
  public cleanUp(): void {
    this.productsObserver?.unobserveProductsElements();
  }

  /**
   * Executed after the product list has been rendered
   */
  public afterRender(): void {
    this.productsObserver?.observeProductsElements(this.productsRef?.current ?? []);
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
