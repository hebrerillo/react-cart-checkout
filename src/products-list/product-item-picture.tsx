import React, { useRef, useState } from "react";
import { Product } from "src/products-list/interface";
import { Spinner } from "src/icons/spinner";

enum PICTURE_STATE {
  CREATED,
  LOADING,
  SLOW_LOADING /* Image is taking too much to load*/,
  LOADED,
}

interface ProductPictureProps {
  product: Product;
}

const SPINNER_TIMEOUT = 1500; //The timeout, in milliseconds, to show the spinner once the image intersects.

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
  const [pictureState, setPictureState] = useState<PICTURE_STATE>(
    PICTURE_STATE.CREATED,
  );
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutSpinnerId = useRef<number>(-1);
  const src = useRef<string>("");

  const intersects = props.product.intersects;
  const alt = props.product.name;

  let spinnerJSX =
    pictureState === PICTURE_STATE.SLOW_LOADING ? <Spinner /> : <></>;

  if (intersects && pictureState === PICTURE_STATE.CREATED) {
    src.current = props.product.desktop_url;
    setPictureState(PICTURE_STATE.LOADING);

    imgRef.current?.addEventListener("load", () => {
      clearSpinnerTimeout(timeoutSpinnerId);
      setPictureState(PICTURE_STATE.LOADED);
    });

    timeoutSpinnerId.current = window.setTimeout(() => {
      setPictureState(PICTURE_STATE.SLOW_LOADING);
    }, SPINNER_TIMEOUT);
  }

  return (
    <div className="product__item-picture-container">
      {spinnerJSX}
      <picture className="product__item-picture">
        <img
          data-src={props.product.desktop_url}
          src={src.current}
          alt={alt}
          ref={imgRef}
        />
      </picture>
    </div>
  );
}
