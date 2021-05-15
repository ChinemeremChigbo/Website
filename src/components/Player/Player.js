import React, { useState, useRef, useEffect } from 'react';

function Controls(props) {
  return (
    <div className="musicPlayer--controls">
      <button aria-label="Last Track" className="last" onClick={() => props.SkipSong(false)}></button>
      <button
        aria-label="Play/Plause"
        className={props.isPlaying ? 'pause' : 'play'}
        onClick={() => props.setIsPlaying(!props.isPlaying)}
      ></button>
      <button aria-label="Next Track" className="next" onClick={() => props.SkipSong()}></button>
      <button
        aria-label="Settings"
        className="settings"
        onClick={() => props.setIsSettings(!props.isSettings)}
      ></button>
      <img
        className={props.isSettings ? 'instructionsOn' : 'instructionsOff'}
        src="Instructions.png"
        alt="Instructions"
      ></img>
    </div>
  );
}
function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

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
    <div>
      <audio loop preload="auto" src={props.songs[props.currentSongIndex].src} ref={audioEl}>
        Your browser does not support the audio element.
      </audio>
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isSettings={isSettings}
        setIsSettings={setIsSettings}
        SkipSong={SkipSong}
      />
    </div>
  );
}

export default Player;
