import React from "react";
import Header from "./layout/header";
import Main from "./layout/main";

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <Main />
    </div>
  );
};

export default App;
