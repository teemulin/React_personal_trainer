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
import Customerlist2 from './components/Customerlist2';

//Need to have:
//List customers and trainings with search and sort
//Add, edit & delete customers
//Add & delete trainings
//Add calender where all trainings are

function App() {
  return (
    <div>
        <header>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" >
                  <a className="App-a" href="/" >J.Smith's Personal Training</a>   
              </Typography>
            </Toolbar>
          </AppBar>
      </header>
      <Router>
        <div className="App">
          <Navigator />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/customers" component={Customerlist} />
              <Route path="/trainings" component={Traininglist} />
              <Route path="/Cust2" component={Customerlist2} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
