/**
 * General purpose utilities
 */

export class CheckoutUtils {
  /**
   * Scrolls to the element passed as a paremeter. If the element is already visible in the viewport, no scrolling is performed.
   *
   * @param {HTMLElement} element The element to scroll to.
   * @param {Number} top The margin top within the viewport of the document.
   */
  public static scrollToElement(
    element: HTMLElement | null,
    top: number = 0,
  ): void {
    const rect = element?.getBoundingClientRect();
    if (
      !rect ||
      (rect.top >= top &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth))
    ) {
      return;
    }

    const finalTop = rect.top + window.pageYOffset - top;
    window.scrollTo({ top: finalTop, behavior: "smooth" });
  }
}
