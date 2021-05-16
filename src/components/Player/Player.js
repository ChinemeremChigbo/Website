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
        onKeyDown={() => props.setIsSettings(!props.isSettings)}
      ></button>
      <img className={props.isSettings ? 'settingsOn' : 'settingsOff'} src="Settings.png" alt="Settings"></img>
      <div
        onKeyDown={() => props.setIsSettings(!props.isSettings)}
        onKeyclassNameDown={props.isSettings ? 'settingsOn' : 'settingsOff'}
      ></div>
    </div>
  );
}
function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isInstructions, setIsInstructions] = useState(false);

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
        SkipSong={SkipSong}
        isSettings={isSettings}
        setIsSettings={setIsSettings}
        isInstructions={isInstructions}
        setIsInstructions={setIsInstructions}
      />
    </div>
  );
}

export default Player;
