import React, { useRef, useEffect, useState } from "react";
import { Product } from "src/products-list/interface";
import { Spinner } from "src/icons/spinner";

interface ProductPictureProps {
  product: Product;
}

export function ProductPicture(props: ProductPictureProps) {
  const src = props.product.intersects ? props.product.desktop_url : "";
  const alt = props.product.name;
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const timeoutIdRef = useRef(-1);

  useEffect(() => {
    const imageElement = imgRef?.current;
    imageElement?.addEventListener("load", (event) => {
      console.log("image loaded", event, imageElement?.complete);
      window.clearTimeout(timeoutIdRef.current);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    timeoutIdRef.current = window.setTimeout(() => {
      
    }, 2000);
  }

  return (
    <div className="product__item-picture-container">
      <Spinner />
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
