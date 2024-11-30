import React from "react";
import { Product } from "src/products-list/interface";
import { HTTPRequest, RequestParams } from "src/utilities/request";

export class ProductListManager {
  /**
   * Performs an asynchronous request to fetch products
   */
  public static async fetchProducts() {
    let result = [] as Array<Product>;

    const successFunc = (resultRequest: Array<Product>) => {
      result = resultRequest;
    };

    const params: RequestParams = {
      url: "http://127.0.0.1/react-test-app1/php/products_list.php",
      successFunc: successFunc,
    };

    await HTTPRequest.performRequest(params);
    return result;
  }

  /**
   * Render the list of products
   */
  public static renderList(productList: Array<Product>): React.JSX.Element[] {
    return productList.map((product) => {
      return (
        <li className="product__item" key={product.id}>
          <img className="product__item-img" src={product.img_url} />
          <div className="product__description">
            <h3>{product.name}</h3>
          </div>
        </li>
      );
    });
  }
}
