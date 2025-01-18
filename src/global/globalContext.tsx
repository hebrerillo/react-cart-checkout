import { useRef } from "react";
import { CheckoutUtils } from "src/utilities/utils";

export class GlobalContextManager {
  private siteHeader: React.RefObject<HTMLElement> | null;

  constructor() {
    this.siteHeader = useRef<HTMLElement>(null);
  }

  public setSiteHeader(siteHeader: React.RefObject<HTMLElement>) {
    this.siteHeader = siteHeader;
  }

  /**
   * Scrolls to a specific checkout element, substracting the height of the checkout header.
   *
   * @param {HTMLElement} element The element to scroll to
   */
  public scrollToCheckoutElement(element: HTMLElement | null) {
    const extraTopOffset = 10;
    CheckoutUtils.scrollToElement(
      element,
      (this.siteHeader?.current?.offsetHeight ?? 0) + extraTopOffset,
    );
  }

  /**
   * @return {number} The height of the site header.
   */
  public getSiteHeaderHeight(): number {
    return this.siteHeader?.current?.getBoundingClientRect().height ?? 0;
  }
}
