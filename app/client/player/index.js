// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import * as config from 'common/config'
import SocketCommands from 'common/socketcommands'
import StateMachine from 'common/state/statemachine'

import PlayerContainer from 'player/components/PlayerContainer.jsx'
import {SetPlayerColorAction} from 'player/state/actions'
import {initialState, playerTransition} from 'player/state/transitions'

import PlayerStyles from 'styles/player/player.scss'
import PlayerColors from 'styles/player/player-colors.scss'

const state = new StateMachine(playerTransition, initialState)

ReactDOM.render(
  React.createElement(PlayerContainer, {state}),
  document.getElementById('root')
)

const socket = io.connect(websocketAddress)
socket.on('connect', () => {
  socket.emit(SocketCommands.joinRoom, config.playerEventsRoom)
})

socket.on(SocketCommands.setPlayerColor, (color: string) => {
  state.dispatch(new SetPlayerColorAction(color))
})
