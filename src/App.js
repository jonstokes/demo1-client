/* eslint-disable */

import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'

import React, { Component } from 'react';
import logo from './logo.svg';
import Register from './pages/Register'
import ConfirmEmail from './pages/ConfirmEmail'
import Login from './pages/Login'
import ViewerInfo from './pages/ViewerInfo'
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
          <ViewerInfo />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default createFragmentContainer(
  App,
  graphql`
    fragment App_viewer on Viewer {
        isLoggedIn
        userName
    }
  `,
)
