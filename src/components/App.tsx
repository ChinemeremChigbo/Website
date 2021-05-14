import React from 'react';

import { useState, useEffect } from 'react';
import Player from './Player/Player';
import Contact from './contact/Contact';
import About from './about/About';
import Projects from './projects/Projects';
import Home from './home/Home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [songs] = useState([
    {
      src: 'BackgroundMusic1.mp3',
    },
    {
      src: 'BackgroundMusic2.mp3',
    },
    {
      src: 'BackgroundMusic2.mp3',
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
    <Router>
      <div className="App">
        <Player
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
        />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
