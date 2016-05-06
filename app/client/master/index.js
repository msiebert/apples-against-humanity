// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import HelloWorld from './HelloWorld.jsx'

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('body')
)
