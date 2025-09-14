import React, { useRef, useState } from "react";
import { Product } from "src/products-list/interface";
import { Spinner } from "src/icons/spinner";
import { ImgLoadError } from "src/icons/img_load_error";

enum PICTURE_STATE {
  CREATED = "created",
  LOADING = "loading",
  SLOW_LOADING = "slow_loading" /* Image is taking too much to load, let's show the spinner. */,
  LOADED = "loaded",
  ERROR = "error",
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

  const timeoutSpinnerId = useRef<number>(-1);
  const src = useRef<string>("");

  const intersects = props.product.intersects;
  const alt = props.product.name;
  let stateImgJSX = <></>;

  /**
   * Callback executed when image has finished loading. The callback covers both
   * the success and fail cases.
   *
   * @param success - true if the image has been loaded successfully, false otherwise.
   */
  const onProductImageLoad = (success: boolean, _: React.SyntheticEvent) => {
    if (pictureState === PICTURE_STATE.CREATED) {
      return;
    }

    const state = success ? PICTURE_STATE.LOADED : PICTURE_STATE.ERROR;
    clearSpinnerTimeout(timeoutSpinnerId);
    setPictureState(state);
  };

  /**
   * Handles the state and initial variables before rendering the component.
   */
  const beforeRender = () => {
    if (pictureState === PICTURE_STATE.SLOW_LOADING) {
      stateImgJSX = <Spinner />;
    } else if (pictureState === PICTURE_STATE.ERROR) {
      stateImgJSX = <ImgLoadError />;
    }

    if (intersects && pictureState === PICTURE_STATE.CREATED) {
      src.current = props.product.desktop_url;
      setPictureState(PICTURE_STATE.LOADING);

      timeoutSpinnerId.current = window.setTimeout(() => {
        setPictureState(PICTURE_STATE.SLOW_LOADING);
      }, SPINNER_TIMEOUT);
    }
  };

  beforeRender();

  return (
    <div className="product__item-picture-container">
      {stateImgJSX}
      <picture className="product__item-picture">
        <img
          data-src={props.product.desktop_url}
          src={src.current}
          alt={alt}
          onLoad={onProductImageLoad.bind(null, true)}
          onError={onProductImageLoad.bind(null, false)}
        />
      </picture>
    </div>
  );
}
