import React from 'react';

import Navbar from './navbar/Navbar';
import Contact from './contact/Contact';
import About from './about/About';
import Join from './join/Join';
import Nonprofits from './nonprofits/Nonprofits';
import Projects from './projects/Projects';
import Students from './students/Students';
import Home from './home/Home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
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
        <Route exact path="/join">
          <Join />
        </Route>
        <Route exact path="/nonprofits">
          <Nonprofits />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/students">
          <Students />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
