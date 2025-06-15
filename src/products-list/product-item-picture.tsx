import React from "react";
import { Product } from "src/products-list/interface";

interface ProductPictureProps {
  product: Product;
}

export function ProductPicture(props: ProductPictureProps) {
  const src = props.product.intersects ? props.product.desktop_url : "";
  const alt = props.product.name;

  return (
    <div className="product__item-picture-container">
      <picture className="product__item-picture">
        <img data-src={props.product.desktop_url} src={src} alt={alt} />
      </picture>
    </div>
  );
}
