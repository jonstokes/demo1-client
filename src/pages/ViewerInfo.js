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

class ViewerInfo extends Component {
  constructor() {
    super()

    const userPool = new CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.appClientId
    })
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          alert(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    this.state = {
      user: cognitoUser
    }
  }

  render() {
    const { user } = this.state
    
    return (
      <div style={{padding: '20px'}}>
        <h2>ViewerInfo</h2>

        {JSON.stringify(user)}

      </div>
    )
  }
}

export default ViewerInfo