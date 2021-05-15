import React, { useState, useRef, useEffect } from 'react';

function Controls(props) {
  return (
    <div className="musicPlayer--controls">
      <button aria-label="Last Track" className="last" onClick={() => props.SkipSong(false)}>
        {/* <img className="skip-btn" src="Last.png" alt="Next Track Image"></img> */}
      </button>
      <button aria-label="Play/Plause" className="play" onClick={() => props.setIsPlaying(!props.isPlaying)}>
        {/* <img className="play-btn" src="Play.png" alt="Play Button Image"></img> */}
      </button>
      <button aria-label="Next Track" className="next" onClick={() => props.SkipSong()}>
        {/* <img className="skip-btn" src="Next.png" alt="Next Track Image"></img> */}
      </button>
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
    <div className="musicPlayer">
      <audio autoPlay loop preload="auto" src={props.songs[props.currentSongIndex].src} ref={audioEl}>
        Your browser does not support the audio element.
      </audio>
      <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
    </div>
  );
}

export default Player;
