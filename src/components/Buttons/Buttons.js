import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Controls(props) {
  return (
    <div className={props.isRules || props.isSettings ? 'musicPlayerControlsInvisible' : 'musicPlayerControls'}>
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
      <img className={props.isSettings ? 'settingsOn' : 'settingsOff'} src="Settings.png" alt="Settings"></img>
      <button
        aria-label="Rules"
        className={props.isRules || props.isSettings ? 'settingsInvisible' : 'rules'}
        onClick={() => props.setIsRules(!props.isRules)}
      ></button>
      <img className={props.isRules ? 'rulesOn' : 'rulesOff'} src="Rules.png" alt="Rules"></img>
      <Link onClick={props.handleClick} to={'/start'}>
        <button aria-label="Start" className="start"></button>
      </Link>
    </div>
  );
}

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isRules, setIsRules] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
    if (isSettings) {
      setIsRules(false);
    } else if (isRules) {
      setIsSettings(false);
    } else {
      setIsSettings(false);
      setIsRules(false);
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
        SkipSong={SkipSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isSettings={isSettings}
        setIsSettings={setIsSettings}
        isRules={isRules}
        setIsRules={setIsRules}
      />
    </div>
  );
}

export default Player;
