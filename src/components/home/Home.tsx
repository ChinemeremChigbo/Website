import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as $ from 'jquery';
import Player from '../Player/Player';

import './Home.scss';
document.onkeydown = function (e) {
  console.log('key down');
  console.log(e);
  // $('.transform').toggleClass('transform-active');
};

const instructions = document.getElementsByClassName('instructions') as HTMLCollectionOf<HTMLElement>;

const Home = () => {
  const [songs] = useState([
    {
      src: 'BackgroundMusic1.mp3',
    },
    {
      src: 'BackgroundMusic2.mp3',
    },
    {
      src: 'BackgroundMusic3.mp3',
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);
  return (
    //SVG of Blueprint Logo and Name
    <div className="background">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
      <img className="name" src="Name.svg" alt="Chinemerem Chigbo"></img>
      {/* <img className="instructions" src="Instructions.png" alt="Instructions"></img> */}
      <img className="pressEnter" src="PressAnyKey.png" alt="Press Enter"></img>
    </div>
  );
};

export default Home;
