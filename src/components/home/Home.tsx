import React from 'react';
import './Home.scss';

export default function Home() {
  //Temporary inline styling. Should be changed when real code is added
  return (
    <div
      className="home"
      style={{ backgroundImage: 'url(http://placehold.it/350x150)', position: 'absolute', top: 100, left: 50 }}
    >
      This is BP!
    </div>
  );
}
