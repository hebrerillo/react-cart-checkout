import { Product } from "src/products-list/interface";
import { CartModalManager } from "src/cart/cartModalManager";

export interface ContextCartState {
  updaterFunction: Function;
  list: Array<Product>;
}

/**
 * Helper class to manage the products items in the cart
 */
export class CartManager {
  private updaterFunction: Function | null;
  private productCartList: Array<Product> | null;
  private cartModalManager: CartModalManager;

  constructor() {
    this.cartModalManager = new CartModalManager();
    this.productCartList = null;
    this.updaterFunction = null;
  }

  public getModalManager(): CartModalManager {
    return this.cartModalManager;
  }

  public setState(state: ContextCartState) {
    this.productCartList = state.list;
    this.updaterFunction = state.updaterFunction;
  }

  public getList() {
    return this.productCartList;
  }

  /**
   * Adds a product in the cart
   *
   * @param {Product} product
   */
  public addProduct(product: Product) {
    if (!this.updaterFunction) {
      return;
    }

    const productFound = this.productCartList?.find(
      (productItem) => productItem.id === product.id,
    );
    if (productFound !== undefined) {
      productFound.amount++;
      this.updaterFunction((currentList: Array<Product>) => {
        return [...currentList];
      });
      return;
    }

    product.amount = 1;
    this.updaterFunction((currentList: Array<Product>) => {
      return [...currentList, product];
    });
  }
}
