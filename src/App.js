import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigator from './components/Navigator';
import Customerlist from './components/Customerlist';
import Traininglist from "./components/Traininglist";
import Home from "./components/Home";

//Need to have:
//List customers and trainings with search and sort
//Add, edit & delete customers
//Add & delete trainings
//Add calender where all trainings are

function App() {
  return (
    <div className="App">
          
              
      <Router>
          <Navigator />
            <Switch>
              <Route exact path="/" component={Customerlist} />
              <Route path="/customers" component={Customerlist} />
              <Route path="/trainings" component={Traininglist} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
      </Router>
      
    </div>
  );
}

export default App;
