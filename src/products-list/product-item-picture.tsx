import React from "react";
import { Product } from "src/products-list/interface";

interface ProductPictureProps {
  product: Product;
}

export function ProductPicture(props: ProductPictureProps) {
  const src = props.product.intersects ? props.product.desktop_url : "";
  return (
    <picture className="product__item-picture">
      <img data-src={props.product.desktop_url} src={src} />
    </picture>
  );
}
