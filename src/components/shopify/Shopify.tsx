import React from "react";
import "./index.scss";
// Components
import APOD from "./components/Apod";
import Header from "./components/Header";

export const Shopify = () => {
  return (
    <div>
      <Header />
      <APOD />
    </div>
  );
};

export default Shopify;
