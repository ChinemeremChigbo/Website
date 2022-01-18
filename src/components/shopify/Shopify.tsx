import React from "react";
// Components
import APOD from "./components/Apod";
import Header from "./components/Header";

export const Shopify = () => {
  return (
    <div
      style={{
        margin: 0,
        overflowX: "hidden",
        overflowY: "auto",
        position: "absolute",
        paddingTop: "35px",
        width: "100%",
        height: "100%",
        top: "0px",
        bottom: "0px",
        left: " 0px",
      }}
    >
      <Header />
      <APOD />
    </div>
  );
};

export default Shopify;
