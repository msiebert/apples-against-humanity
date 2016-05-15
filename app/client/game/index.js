// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import * as config from '../../common/config'
import SocketCommands from '../../common/socketcommands'
import HelloWorld from './HelloWorld.jsx'

import StateMachine from '../../common/state/statemachine'
import {gameTransition, initialState} from './state/transitions'
import {AddPlayerAction} from './state/actions'

const state = new StateMachine(gameTransition, initialState)

const socket = io.connect(websocketAddress)
socket.on('connect', () => {
  socket.emit(SocketCommands.joinRoom, config.gameEventsRoom)
})

socket.on(SocketCommands.addPlayer, (name) => {
  state.dispatch(new AddPlayerAction(name))
})

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('root')
)
