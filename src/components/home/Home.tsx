import React from 'react';
import './Home.scss';

export default function Home() {
  //Temporary inline styling. Should be changed when real code is added
  return (
    <div
      className="home"
      style={{ position: 'absolute', top: 100, left: 50 }}
    >
      Welcome!
    </div>
  );
}
