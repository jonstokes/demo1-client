/* eslint-disable */

import React, { Component } from 'react';
import logo from './logo.svg';
import Register from './pages/Register'
import ConfirmEmail from './pages/ConfirmEmail'
import Login from './pages/Login'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Login />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
