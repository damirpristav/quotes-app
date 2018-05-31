import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Intro from './components/layout/Intro';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Quotes from './components/layout/Quotes';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/layout/NotFound';
import AddQuote from './components/dashboard/Quotes/AddQuote';
import EditQuote from './components/dashboard/Quotes/EditQuote';
import MyProfile from './components/dashboard/Profile/MyProfile';
import EditProfile from './components/dashboard/Profile/EditProfile';
import PublicProfile from './components/dashboard/Profile/PublicProfile';
import UserVerified from './components/layout/UserVerified';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={ Intro } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/quotes" component={ Quotes } />
          <Route exact path="/profile/:username" component={ PublicProfile } />
          <Route exact path="/user-verified/:token" component={ UserVerified } />
          <PrivateRoute exact path="/dashboard" component={ Dashboard } />
          <PrivateRoute exact path="/add-quote" component={ AddQuote } />
          <PrivateRoute exact path="/edit-quote/:quoteId" component={ EditQuote } />
          <PrivateRoute exact path="/my-profile" component={ MyProfile } />
          <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
          <Route component={ NotFound } />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
