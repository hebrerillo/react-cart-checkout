import React from "react";
import Header from "src/layout/header";
import { ProductsList } from "src/products-list/products-list";

function App() {
  return (
    <div className="main-container">
      <Header />
      <ProductsList />
    </div>
  );
}

export default App;
