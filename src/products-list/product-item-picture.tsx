import React, { useRef, useState } from "react";
import { Product } from "src/products-list/interface";
import { Spinner } from "src/icons/spinner";

interface ProductPictureProps {
  product: Product;
}

const SPINNER_TIMEOUT = 1200; //The timeout, in milliseconds, to show the spinner once the image intersects.

/**
 * Clears the timeout triggered to show the spinner
 *
 * @param timeoutRef The reference object holding the timeout
 */
function clearSpinnerTimeout(timeoutRef: React.MutableRefObject<number>) {
  if (!timeoutRef || !timeoutRef.current) {
    return;
  }

  window.clearTimeout(timeoutRef.current);
  timeoutRef.current = -1;
}

export function ProductPicture(props: ProductPictureProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutSpinnerId = useRef<number>(-1);

  const intersects = props.product.intersects;
  const src = intersects ? props.product.desktop_url : "";
  const alt = props.product.name;
  const imageElement = imgRef.current;

  let spinnerJSX = showSpinner && !isLoaded ? <Spinner /> : <></>;

  if (
    intersects &&
    imageElement &&
    !isLoaded &&
    timeoutSpinnerId.current === -1
  ) {
    imageElement.addEventListener("load", () => {
      clearSpinnerTimeout(timeoutSpinnerId);
      setIsLoaded(true);
    });

    timeoutSpinnerId.current = window.setTimeout(() => {
      setShowSpinner(true);
    }, SPINNER_TIMEOUT);
  }

  return (
    <div className="product__item-picture-container">
      {spinnerJSX}
      <picture className="product__item-picture">
        <img
          data-src={props.product.desktop_url}
          src={src}
          alt={alt}
          ref={imgRef}
        />
      </picture>
    </div>
  );
}
