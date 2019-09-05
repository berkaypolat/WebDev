import React from 'react'
import logo from './logo.svg'
import Home from './Home'
import GroupList from './GroupList'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/groups" exact={true} component={GroupList}/>
      </Switch>
    </Router>
  );
}

export default App;
