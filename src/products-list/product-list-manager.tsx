import React from "react";
import { Product } from "src/products-list/interface";
import { ProductItem } from "src/products-list/product-item";
import { HTTPRequest, RequestParams } from "src/utilities/request";
import { GlobalContextManager } from "src/context/globalContext";
import { ProductsObserver } from "src/products-list/products-observer";

export interface ProductsState {
  list: Array<Product>;
  updaterFunction: Function;
  globalContext: GlobalContextManager;
}

export class ProductListManager {
  private productsObserver: ProductsObserver | null;
  private updaterFunction: Function | null;
  private productList: Array<Product> | null;

  constructor() {
    this.updaterFunction = null;
    this.productsObserver = null;
    this.productList = null;
  }

  /**
   * Sets the products state variable and updater function.
   *
   * @param {ProductsState} state
   */
  public setState(state: ProductsState) {
    this.productList = state.list;
    this.updaterFunction = state.updaterFunction;
    if (!this.productsObserver) {
      this.productsObserver = new ProductsObserver(this, state.globalContext);
    }
  }

  /**
   * Updates the intersection information of a product.
   *
   * @param {string} productId The id of the product.
   * @param {boolean} intersects Whether the product is intersecting in the view port.
   */
  public updateProductIntersection(productId: string, intersects: boolean) {
    const product = this.productList?.find((productItem: Product) => {
      return productItem.id === productId;
    });

    if (!product || !intersects) {
      return;
    }

    product.intersects = true;
    this.updateProductList([]);
  }

  /**
   * Executed after the product list has been rendered
   */
  public afterRender(productsElement: Array<HTMLLIElement>): void {
    this.productsObserver?.observeProductsElements(productsElement);
  }

  private updateProductList(newList: Array<Product>) {
    if (!this.updaterFunction) {
      return;
    }

    this.updaterFunction((currentProductList: Array<Product>) => {
      return [...currentProductList, ...newList];
    });
  }

  /**
   * Performs an asynchronous request to fetch products
   */
  public async fetchProducts() {
    let result = [] as Array<Product>;

    const successFunc = (resultRequest: Array<Product>) => {
      result = resultRequest;
      this.updateProductList(result);
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
  public renderList(
    productList: Array<Product>,
    productsRefCallback: Function,
  ): React.JSX.Element[] {
    return productList.map((product) => {
      return (
        <ProductItem
          key={product.id}
          product={product}
          refCallback={productsRefCallback}
        />
      );
    });
  }
}
