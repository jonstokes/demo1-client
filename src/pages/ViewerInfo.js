/* eslint-disable */

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { invokeApig } from "../libs/awsLib"

class ViewerInfo extends Component {
  render() {
    const userData = invokeApig({
      path: "/query",
      method: "GET"
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