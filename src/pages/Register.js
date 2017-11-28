/* eslint-disable */

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

let AWS = require('aws-sdk')
let AWSCognito = require('amazon-cognito-identity-js')

import config from './../config/secrets.json'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      canSubmit: true,
      email: "",
      password: ""
    }
  }

  register = (e) => {
    console.log(`Registering ${this.state.email} ${this.state.password}`)

    AWS.config.region = config.cognitoRegion // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.identityPoolId
    });

    let poolData = { 
      UserPoolId : config.userPoolId,
      ClientId : config.appClientId
    };
    let userPool = new AWSCognito.CognitoUserPool(poolData);

    let attributeList = [];

    let dataEmail = {
        Name : 'email',
        Value : this.state.email
    };
    let attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp('email', 'password', attributeList, null, function(err, result){
        if (err) {
            alert(err);
            console.log(err)
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    const { email, password } = this.state
    
    return (
      <div style={{padding: '20px'}}>
        <h2>Register</h2>

        <form
          onSubmit={this.register}
        >

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