import React from "react";
import Home from "./home/Home";
import Game from "./game/Game";
import Contact from "./contact/Contact";
import About from "./about/About";
import Experience from "./experience/Experience";
import ChimneySweep from "./chimneySweep/ChimneySweep";
import Shopify from "./shopify/Shopify";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./shopify/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reportWebVitals from "./shopify/reportWebVitals";
import "./shopify/index.scss";

import Error from "./Error/Error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

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
        <Route exact path="/experience">
          <Experience />
        </Route>
        <Route exact path="/chimneySweep">
          <ChimneySweep />
        </Route>
        <Route exact path="/shopify">
          ReactDOM.render(
          <Provider store={store}>
            <Shopify />
          </Provider>
          , document.getElementById('root') );
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
reportWebVitals();

export default App;
