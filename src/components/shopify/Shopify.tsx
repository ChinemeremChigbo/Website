import React from 'react';

// Components
import APOD from './components/Apod';
import Header from './components/Header';

export const Shopify = () => {
  return (
    <div className="App">
      <Header />
      <APOD />
    </div>
  );
};

export default Shopify;
