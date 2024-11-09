import { createContext } from "react";
import React, { useRef } from "react";
import { CheckoutUtils } from "../utilities/utils";

export interface GlobalContextType {
  scrollToCheckoutElement: Function;
  checkoutHeader: React.MutableRefObject<HTMLElement | null>;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const checkoutHeader = useRef<HTMLElement>(null);

  /**
   * Scrolls to a specific checkout element, substracting the height of the checkout header.
   *
   * @param {HTMLElement} element The element to scroll to
   */
  function scrollToCheckoutElement(element: HTMLElement) {
    CheckoutUtils.scrollToElement(
      element,
      checkoutHeader.current?.offsetHeight ?? 0,
    );
  }

  const valueToShare = {
    scrollToCheckoutElement,
    checkoutHeader,
  };

  return (
    <GlobalContext.Provider value={valueToShare}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider };
export default GlobalContext;
