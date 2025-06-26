import React, { useRef, useState } from "react";
import { Product } from "src/products-list/interface";
import { Spinner } from "src/icons/spinner";

interface ProductPictureProps {
  product: Product;
}

export function ProductPicture(props: ProductPictureProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const intersects = props.product.intersects;
  const src = intersects ? props.product.desktop_url : "";
  const alt = props.product.name;
  const imageElement = imgRef.current;

  let spinnerJsx = <Spinner />;

  if (imageElement && !isLoaded) {
    imageElement.addEventListener("load", () => {
      setIsLoaded(true);
    });
  } else if (isLoaded) {
    spinnerJsx = <></>;
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
