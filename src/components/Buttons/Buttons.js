import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Controls(props) {
  return (
    <div className="backgroundBack">
      <div className={props.isRules || props.isSettings ? 'backgroundBlurred' : 'background'}>
        <div>
          <div className={props.isRules || props.isSettings ? 'musicPlayerControlsInvisible' : 'musicPlayerControls'}>
            <button
              aria-label="Last Track"
              className="musicPlayerControlsLast"
              onClick={() => props.SkipSong(false)}
            ></button>
            <button
              aria-label="Play/Plause"
              className={props.isPlaying ? 'musicPlayerControlsPause' : 'musicPlayerControlsPlay'}
              onClick={() => props.setIsPlaying(!props.isPlaying)}
            ></button>
            <button
              aria-label="Next Track"
              className="musicPlayerControlsNext"
              onClick={() => props.SkipSong()}
            ></button>
            <button
              aria-label="Settings"
              className="settings"
              onClick={() => props.setIsSettings(!props.isSettings)}
            ></button>
            <img className="name" src="Name.png" alt="Chinemerem Chigbo"></img>
            <Link onClick={props.handleClick} to={'/game'}>
              <div className="bottomButtons">
                <button aria-label="Rules" className="rules" onClick={() => props.setIsRules(!props.isRules)}></button>
                <button aria-label="Start" className="start"></button>
              </div>
            </Link>
          </div>
          <button
            aria-label="Done"
            className={props.isSettings ? 'settingsDone' : 'settingsDoneOff'}
            onClick={() => props.setIsSettings(false)}
          ></button>
          <button
            aria-label="Done"
            className={props.isRules ? 'rulesDone' : 'rulesDoneOff'}
            onClick={() => props.setIsRules(false)}
          ></button>
          <img className={props.isSettings ? 'settingsOn' : 'settingsOff'} src="Settings.png" alt="Settings"></img>
          <img className={props.isRules ? 'rulesOn' : 'rulesOff'} src="Rules.png" alt="Rules"></img>
        </div>
      </div>
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
