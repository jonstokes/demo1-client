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

class ConfirmEmail extends Component {
  constructor() {
    super()
    this.state = {
      canSubmit: true,
      userName: "",
      email: "",
      confirmationCode: ""
    }
  }

  confirm = (e) => {
    e.preventDefault()

    const { userName, email, confirmationCode } = this.state
    const userPool = new CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.appClientId
    });
    const cognitoUser = new CognitoUser({ Username: userName, Pool: userPool })

    console.log(`Confirming ${userName} (${email}) with ${confirmationCode}`)

    cognitoUser.confirmRegistration(confirmationCode, true, function(err, result){
        if (err) {
            alert(err);
            console.log(err)
            return;
        }
        console.log('user name is ' + cognitoUser.getUsername());
    });

    if (cognitoUser) {
      this.setState({ user: cognitoUser })
    }
  }

  handleConfirmationCodeChange = (event) => {
    this.setState({ confirmationCode: event.target.value })
  }

  handleUserNameChange = (event) => {
    this.setState({ userName: event.target.value })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  render() {
    const { userName, email, confirmationCode } = this.state
    
    return (
      <div style={{padding: '20px'}}>
        <h2>ConfirmEmail</h2>

        <form
          onSubmit={this.confirm}
        >

          <TextField
            name="userName"
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
          />

          <TextField
            name="confirm"
            floatingLabelText="Confirmation Code"
            value={confirmationCode}
            onChange={this.handleConfirmationCodeChange}            
            fullWidth
            required
          />

          <RaisedButton
            type="submit"
            label="Confirm"
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

export default ConfirmEmail