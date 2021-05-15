import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as $ from 'jquery';

import './Home.scss';
document.onkeydown = function (e) {
  console.log('key down');
  console.log(e);
  // $('.transform').toggleClass('transform-active');
};

const instructions = document.getElementsByClassName('instructions') as HTMLCollectionOf<HTMLElement>;

const Home = () => {
  return (
    //SVG of Blueprint Logo and Name
    <div className="background">
      <img className="name" src="Name.svg" alt="Chinemerem Chigbo"></img>
      {/* <img className="instructions" src="Instructions.png" alt="Instructions"></img> */}
      <img className="pressEnter" src="PressAnyKey.png" alt="Press Enter"></img>
    </div>
  );
};

export default Home;
