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
  private productCartList: Array<Product>;
  private cartModalManager: CartModalManager;

  constructor() {
    this.cartModalManager = new CartModalManager();
    this.productCartList = [];
    this.updaterFunction = null;
  }

  public getModalManager(): CartModalManager {
    return this.cartModalManager;
  }

  public setState(state: ContextCartState): void {
    this.productCartList = state.list;
    this.updaterFunction = state.updaterFunction;
  }

  public getList(): Array<Product> {
    return this.productCartList;
  }

  /**
   * @return {boolean} true if the cart has no products, false otherwise.
   */
  public isEmpty(): boolean {
    return this.productCartList.length === 0;
  }

  /**
   * Adds a product in the cart
   *
   * @param {Product} product
   */
  public addProduct(product: Product): void {
    if (!this.updaterFunction || !this.productCartList) {
      return;
    }

    const productFound = !!this.productCartList.find(
      (productItem) => productItem.id === product.id,
    );

    let newList = [] as Array<Product>;
    if (productFound) {
      product.amount++;
      newList = [...this.productCartList];
    } else {
      product.amount = 1;
      newList = [...this.productCartList, product];
    }

    this.updaterFunction(() => {
      return newList;
    });
  }

  public decreaseProduct(product: Product): void {
    if (!this.updaterFunction || !this.productCartList) {
      return;
    }

    let newList = [] as Array<Product>;
    product.amount--;

    if (product.amount === 0) {
      newList = this.productCartList?.filter((productItem) => {
        return product !== productItem;
      });
    } else {
      newList = [...this.productCartList];
    }

    this.updaterFunction(() => {
      return newList;
    });
  }

  public getTotalPrice(): number {
    let totalPrice = 0;
    this.productCartList?.forEach((product) => {
      totalPrice += product.price * product.amount;
    });

    return totalPrice;
  }
}
