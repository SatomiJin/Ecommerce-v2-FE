import React from "react";
import Header from "./HeaderComponent/Header";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default DefaultComponent;
