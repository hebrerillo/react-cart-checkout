import { GlobalContextManager } from "src/global/globalContext";
import { ProductListManager } from "src/products-list/product-list-manager";

/**
 * Class that implements an interesection observer to observe for changes in the visibility of product items.
 * When the last product element intersects the viewport, new products are requested to the server.
 */
export class ProductsObserver {
  private observer!: IntersectionObserver;
  private observerOptions: IntersectionObserverInit;
  private listManager: ProductListManager;

  constructor(
    listManager: ProductListManager,
    globalContext: GlobalContextManager,
  ) {
    this.listManager = listManager;
    this.observerOptions = {
      root: null,
      threshold: 0,
      rootMargin: `-${globalContext.getSiteHeaderHeight()}px 0px 0px 0px`,
    };

    this.observer = new IntersectionObserver(
      this.observerCallback.bind(this),
      this.observerOptions,
    );
  }

  /**
   * Gets executed when items are intersecting
   */
  private observerCallback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const target = entry.target as HTMLElement;
      this.listManager.productIntersects(target.dataset.id ?? "");

      if (this.isLastProductElement(target)) {
        this.listManager.fetchProducts();
      }
    });
  }

  /**
   * @param {HTMLLIElement} productElement
   *
   * @returns {boolean}
   *          true if 'productElement' is the last child element in the list of products.
   */
  private isLastProductElement(productElement: HTMLElement): boolean {
    const parent = productElement.parentElement as HTMLElement;
    return parent.lastElementChild === productElement;
  }

  /**
   * Observes the products HTML elements in the list 'productsArray'.
   *
   * @param {Array<HTMLLIElement>} productsArray
   *        The array of products to be observed
   */
  public observeProductsElements(productsArray: Array<HTMLLIElement>) {
    productsArray.forEach(
      (product) => product && this.observer?.observe(product),
    );
  }
}
