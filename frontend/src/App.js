import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Login from './components/auth/login';
import ToolView from './components/toolview/view';
function App() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/" component={Login}/>
        <Route path="/toolview" component={ToolView} />

      </Switch>
    </Router>
    
    
  );
}

export default App;
