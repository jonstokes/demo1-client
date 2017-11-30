/* eslint-disable */

import 'babel-polyfill'
import 'whatwg-fetch'

const babelRegister = require('babel-register')

babelRegister()


import React from 'react'
import ReactDOM from 'react-dom'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import BrowserProtocol from 'farce/lib/BrowserProtocol'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createFarceRouter from 'found/lib/createFarceRouter'
import createRender from 'found/lib/createRender'
import { Resolver } from 'found-relay'

import fetchQuery from './libs/fetchQuery'
import routes from './Routes'

import './index.css';

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,
  render: createRender({}),
})

ReactDOM.render(
  <Router resolver={new Resolver(environment)} />,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
)
