import React, { useState, useRef, useEffect } from 'react';

function Controls(props) {
  return (
    <div className="c-player--controls">
      <button className="skip-btn" onClick={() => props.SkipSong(false)}></button>
      <button className="play-btn" onClick={() => props.setIsPlaying(!props.isPlaying)}></button>
      <button className="skip-btn" onClick={() => props.SkipSong()}></button>
    </div>
  );
}

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;
        if (temp > props.songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;
        if (temp < 0) {
          temp = props.songs.length - 1;
        }
        return temp;
      });
    }
  };

  return (
    <div className="c-player">
      <audio autoPlay loop preload="auto" src={props.songs[props.currentSongIndex].src} ref={audioEl}>
        Your browser does not support the audio element.
      </audio>
      <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
    </div>
  );
}

export default Player;
