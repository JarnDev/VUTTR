import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Login from './components/auth/login';
import ToolView from './components/toolview/view';
import Cadastro from './components/cadastro/cadastro';
function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route path="/toolview" component={ToolView} />

      </Switch>
    </Router>
  );
}

export default App;
