import React from "react";
import Header from "src/layout/header";
import { ProductList } from "src/products-list/products-list";

function App() {
  return (
    <div className="main-container">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
