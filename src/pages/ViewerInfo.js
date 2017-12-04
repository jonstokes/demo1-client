/* eslint-disable */

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import config from './../config/secrets.json'

import getCurrentUserToken from './../libs/awslib';

class ViewerInfo extends Component {
  render() {
    const endpoint = `${config.invokeUrl}/hello`

    let response =  fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: getCurrentUserToken()
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (data.errors) {
          throw data.errors.map(({ message }) => message)
        }
        return data
      })
  

    return (
      <div style={{padding: '20px'}}>
        <h2>ViewerInfo</h2>

        {JSON.stringify(userData)}

      </div>
    )
  }
}

export default ViewerInfo