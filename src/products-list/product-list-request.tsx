import { Product } from "src/products-list/interface";

export class ProductRequest {
  public static async fetchProducts() {
    const resultRequest = await fetch(
      "http://127.0.0.1/react-test-app1/php/products_list.php",
    );
    const jsonResult = await resultRequest.json();
    return jsonResult as Array<Product>;
  }
}
