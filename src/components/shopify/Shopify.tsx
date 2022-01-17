import React from "react";
import "./Shopify.scss";
// Components
import APOD from "./components/Apod";
import Header from "./components/Header";

export const Shopify = () => {
  return (
    <div className= "homepage" >
      <Header />
      <APOD />
    </div>
  );
};

export default Shopify;
