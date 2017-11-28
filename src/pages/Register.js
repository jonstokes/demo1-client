/* eslint-disable */

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

import config from './../config/secrets.json'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      canSubmit: true,
      userName: "",
      email: "",
      password: ""
    }
  }

  register = (e) => {
    e.preventDefault()

    const { userName, email, password } = this.state
    const userPool = new CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.appClientId
    });
    let cognitoUser

    userPool.signUp(userName, password, [], null, function(err, result){
        if (err) {
            alert(err);
            console.log(err)
            return;
        }
        cognitoUser = result.user
        console.log('user name is ' + cognitoUser.getUsername());
    });

    if (cognitoUser) {
      this.setState({ user: cognitoUser })
    }
  }

  handleUserNameChange = (event) => {
    this.setState({ userName: event.target.value })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    const { userName, email, password } = this.state
    
    return (
      <div style={{padding: '20px'}}>
        <h2>Register</h2>

        <form
          onSubmit={this.register}
        >

          <TextField
            name="username"
            floatingLabelText="Username"
            value={userName}
            onChange={this.handleUserNameChange}            
            fullWidth
            required
          />


          <TextField
            name="email"
            type="email"
            floatingLabelText="E-Mail"
            value={email}
            onChange={this.handleEmailChange}            
            fullWidth
            required
          />

          <TextField
            name="password"
            type="password"
            floatingLabelText="Password"
            value={password}
            onChange={this.handlePasswordChange}            
            fullWidth
            required
          />

          <RaisedButton
            type="submit"
            label="Register"
            secondary
            fullWidth
            style={{ marginTop: 20 }}
            disabled={!this.state.canSubmit}
          />
        </form>

      </div>
    )
  }
}

export default Register