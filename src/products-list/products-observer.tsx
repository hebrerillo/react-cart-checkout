import { useGlobalContext } from "src/context/global";

/**
 * Utility class to implement an interesection observer in the list of product elements.
 * When the last product element intersects the viewport, new products are requested to the server.
 */
export class ProductsObserver {
  private observer!: IntersectionObserver;
  private fetchProductsCallback: Function; //Callback to be executed when the last product is intersecting
  private observerOptions: IntersectionObserverInit;

  constructor(fetchProductsCallback: Function) {
    this.fetchProductsCallback = fetchProductsCallback;
    const { globalContextManager } = useGlobalContext();
    this.observerOptions = {
      root: null,
      threshold: 0,
      rootMargin: `-${globalContextManager.getSiteHeaderHeight()}px 0px 0px 0px`,
    };
  }

  /**
   * Gets executed when items are intersecting
   */
  private observerCallback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        if (this.isLastProductElement(entry.target as HTMLElement)) {
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
   * @param {HTMLLIElement} productElement
   * @returns {boolean} true if 'productElement' is the last child element in the list of products.
   */
  private isLastProductElement(productElement: HTMLElement): boolean {
    const parent = productElement.parentElement as HTMLElement;
    return parent.lastElementChild === productElement;
  }

  /**
   * Observes the products HTML elements in the list 'productsArray'.
   *
   * @param {Array<HTMLLIElement>} productsArray The array of products
   */
  public observeProductsElements(productsArray: Array<HTMLLIElement>) {
    this.observer = new IntersectionObserver(
      this.observerCallback.bind(this),
      this.observerOptions,
    );

    productsArray.forEach(
      (product) => product && this.observer?.observe(product),
    );
  }

  /**
   * Unobserves the products elements
   */
  public unobserveProductsElements() {
    this.observer?.disconnect();
  }
}
