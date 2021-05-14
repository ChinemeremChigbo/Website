import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
function getVolume() {
  document.onkeydown = function (e) {
    console.log('key down');
    console.log(e);
    document.location.href = '/about';
  };
}
// function getVolume() {
//   const x = document.getElementById('myAudio');
//   alert(x?.volume);
// }

const Home = () => {
  return (
    //SVG of Blueprint Logo and Name
    <div className="background">
      <audio id="myAudio" controls autoPlay loop preload="auto">
        <source src="BackgroundMusic.ogg" type="audio/ogg" />
        <source src="BackgroundMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <img className="name" src="Name.svg" alt="Chinemerem Chigbo"></img>
      <img className="pressEnter" src="PressAnyKey.png" alt="Press Enter"></img>
    </div>
  );
};

export default Home;
