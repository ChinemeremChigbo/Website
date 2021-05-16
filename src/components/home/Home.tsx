import React, { useState, useEffect } from 'react';
import Player from '../Buttons/Buttons';
import './Home.scss';

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
    </div>
  );
};

export default Home;
