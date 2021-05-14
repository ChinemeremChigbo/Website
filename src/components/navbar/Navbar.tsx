import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    //SVG of Blueprint Logo and Name
    <div className="background">
      <div className="audio-player">
        <div className="timeline">
          <div className="progress"></div>
        </div>
        <div className="controls">
          <div className="play-container">
            <div className="toggle-play play"></div>
          </div>
          <div className="time">
            <div className="current">0:00</div>
            <div className="divider">/</div>
            <div className="length"></div>
          </div>
          <div className="name">Music Song</div>
          <div className="volume-container">
            <div className="volume-button">
              <div className="volume icono-volumeMedium"></div>
            </div>

            <div className="volume-slider">
              <div className="volume-percentage"></div>
            </div>
          </div>
        </div>
      </div>
      <audio controls autoPlay loop preload="auto">
        <source src="BackgroundMusic.ogg" type="audio/ogg" />
        <source src="BackgroundMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <img className="name" src="Name.svg" alt="Chinemerem Chigbo"></img>
      <img className="name" src="PressEnter.png" alt="Press Enter"></img>
    </div>
  );
};

export default Navbar;
