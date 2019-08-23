import React, { Component} from 'react';
import { Route, Switch } from "react-router-dom";

import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

class App extends Component {


  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/signup" component={Signup} />
          <Route path="/auth/logout" component={Logout} />
          <Route path="/auth/login" component={Login} />
          <ProtectedRoute 
              redirectUrl='/auth/signup' 
              path="/profile" 
              component={Profile}
          />
          <Route path="/recipe" component={RecipeDetails}/>
        </Switch>
      </div>
    )
  }
}

export default App;
