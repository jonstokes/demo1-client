/* eslint-disable */

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { invokeApig } from "../libs/awsLib"

class ViewerInfo extends Component {
  render() {
    let userData

    let response = invokeApig({
      path: "/graphql",
      method: "POST",
      body: { query: '{__schema { queryType { name, fields { name, description} }}}' }
    }).then(data => console.log(data))

    return (
      <div style={{padding: '20px'}}>
        <h2>ViewerInfo</h2>

        {JSON.stringify(userData)}

      </div>
    )
  }
}

export default ViewerInfo