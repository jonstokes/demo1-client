/* eslint-disable */

import React from 'react'
import { graphql } from 'react-relay'
import Route from 'found/lib/Route'
import makeRouteConfig from 'found/lib/makeRouteConfig'

import App from './App'

const appQuery = graphql`query Routes_App_Query { viewer { ...App_viewer } }`

export default makeRouteConfig(
  <Route
    path="/"
    query={appQuery}
    // we use the render method instead of Component here to always display Header
    // and Navigation even if the data has not been fetched yet
    render={({ match, ownProps, props }) =>
      <App {...match} {...ownProps} {...props} isLoading={!props} />}
  />
)
