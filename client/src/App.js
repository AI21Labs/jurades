import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import Done from "./pages/Done";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Game/>
        </Route>
        <Route path="/done">
          <Done/>
        </Route>
        <Route path="/">
          <Welcome/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
