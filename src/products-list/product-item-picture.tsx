import React, { useRef, useState } from "react";
import { Product } from "src/products-list/interface";
import { Spinner } from "src/icons/spinner";

interface ProductPictureProps {
  product: Product;
}

const SPINNER_TIMEOUT = 150; //The timeout, in milliseconds, to show the spinner once the image intersects.

export function ProductPicture(props: ProductPictureProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutSpinnerId = useRef<number>(-1);

  const intersects = props.product.intersects;
  const src = intersects ? props.product.desktop_url : "";
  const alt = props.product.name;
  const imageElement = imgRef.current;

  let spinnerJsx = showSpinner && !isLoaded ? <Spinner /> : <></>;

  if (
    intersects &&
    imageElement &&
    !isLoaded &&
    timeoutSpinnerId.current === -1
  ) {
    imageElement.addEventListener("load", () => {
      window.clearTimeout(timeoutSpinnerId.current);
      timeoutSpinnerId.current = -1;
      setIsLoaded(true);
    });

    timeoutSpinnerId.current = window.setTimeout(() => {
      setShowSpinner(true);
    }, SPINNER_TIMEOUT);
  }

  return (
    <div className="product__item-picture-container">
      {spinnerJsx}
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
