import React from "react";
import styles from "./index.module.scss";
// Components
import APOD from "./components/Apod";
import Header from "./components/Header";

export const Shopify = () => {
  return (
    <div className={styles.shomepage}>
      <Header />
      <APOD />
    </div>
  );
};

export default Shopify;
