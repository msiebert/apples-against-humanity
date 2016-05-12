// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import config from '../../common/config'
import SocketCommands from '../../common/socketcommands'
import HelloWorld from './HelloWorld.jsx'

const socket = io.connect('localhost:3001')
socket.on('connect', () => {
  socket.emit(SocketCommands.joinRoom, config.gameEventsRoom)
})

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('body')
)
