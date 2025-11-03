import React from "react";
import { Product } from "src/products-list/interface";
import { ProductItem } from "src/products-list/product-item";
import { HTTPRequest, RequestParams, MockRequest } from "src/utilities/request";
import { GlobalContextManager } from "src/global/globalContext";
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
   * Updates the intersection information of a product and updates the products list.
   *
   * @param {string} productId
   *                 The id of the product that is intersecting in the viewport.
   */
  public productIntersects(productId: string) {
    const product = this.productList?.find((productItem: Product) => {
      return productItem.id === productId;
    });

    if (!product) {
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

  /**
   * Executes the updater function with the new products
   *
   * @param {Array<Product>} newList
   *        The new products to add
   */
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
    const params: RequestParams = {
      url: "http://localhost:8082/carslist",
      successFunc: this.fetchProductsSuccessCallback.bind(this),
    };

    params.mock = {} as MockRequest;
    params.mock.timeout = 333;
    params.mock.shouldFail = false;
    params.mock.result = this.getMockResult();

    await HTTPRequest.performRequest(params);
  }

  /**
   * @returns An array of mocking products.
   */
  private getMockResult(): Array<Product> {
    let output = [];
    for (let i = 0; i < 10; i++) {
      const id = Math.floor(Math.random() * 100000);
      let obj = {
        id: `${id}`,
        name: "renault",
        mobile_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/2017_Renault_Megane_Dynamique_S_NAV_DC_1.5_Front.jpg/330px-2017_Renault_Megane_Dynamique_S_NAV_DC_1.5_Front.jpg?id=" + id + "&mobile",
        desktop_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/2017_Renault_Megane_Dynamique_S_NAV_DC_1.5_Front.jpg/330px-2017_Renault_Megane_Dynamique_S_NAV_DC_1.5_Front.jpg?id=" + id + "&desktop",
      } as Product;
      output.push(obj);
    }
    return output;
  }

  /**
   * Callback executed after a successful retrieval of products from the server.
   *
   * @param {Array<Product>}
   *        The array of products retrieved from the server.
   */
  private fetchProductsSuccessCallback(resultRequest: Array<Product>) {
    this.updateProductList(resultRequest);
  }

  /**
   * Render the list of products
   */
  public renderList(
    productList: Array<Product>,
    productsRefCallback: React.LegacyRef<HTMLLIElement>,
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
