/* eslint-disable */

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";

import 'aws-sdk/dist/aws-sdk'
const AWS = window.AWS

import config from './../config/secrets.json'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      canSubmit: true,
      userName: "",
      email: "",
      password: ""
    }
  }

  login = (e) => {
    e.preventDefault()

    const { userName, email, password } = this.state
    const userPool = new CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.appClientId
    })
    const authenticationData = {
      Username : userName,
      Password : password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const cognitoUser = new CognitoUser({ Username: userName, Pool: userPool })    
    const cognitoURI = 'cognito-idp.' + config.cognitoRegion + '.amazonaws.com/' + config.userPoolId

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          console.log('access token + ' + result.getAccessToken().getJwtToken());

          //POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.update({ region: config.cognitoRegion })

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : config.identityPoolId, // your identity pool id here
            Logins : {
              // Change the key below according to the specific region your user pool is in.
              [cognitoURI] : result.getIdToken().getJwtToken()
            }
          });
          
          //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
          AWS.config.credentials.refresh((error) => {
              if (error) {
                console.error(error);
              } else {
                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
                console.log('Successfully logged in!');
              }
          });
      },

      onFailure: function(err) {
        console.log(err)
        alert(err)
      }
    })
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
        <h2>Login</h2>

        <form
          onSubmit={this.login}
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
            label="Login"
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

export default Login