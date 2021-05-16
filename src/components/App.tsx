import React from 'react';
import Home from './home/Home';
import Game from './game/Game';
import Contact from './contact/Contact';
import About from './about/About';
import Projects from './projects/Projects';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/game">
          <Game />
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
