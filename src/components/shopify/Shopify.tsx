import React from "react";
// Components
import APOD from "./components/Apod";
import Header from "./components/Header";

export const Shopify = () => {
  return (
    <div
      style={{
        margin: 0,
        overflow: "scroll",
        position: "absolute",
        paddingTop: "35px",
        width: "100%",
        height: "100vh",
        top: "0px",
        bottom: "0px",
        left: " 0px",
      }}
      className="scroll"
    >
      <Header />
      <APOD />
    </div>
  );
};

export default Shopify;
