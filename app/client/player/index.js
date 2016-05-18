// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import StateMachine from 'common/state/statemachine'

import PlayerContainer from 'player/components/PlayerContainer.jsx'
import Socket from 'player/socket'
import {initialState, playerTransition} from 'player/state/transitions'

import PlayerStyles from 'styles/player/player.scss'
import PlayerColors from 'styles/player/player-colors.scss'

const stateMachine = new StateMachine(playerTransition, initialState)

const socket = new Socket(io.connect(websocketAddress), stateMachine)

ReactDOM.render(
  React.createElement(PlayerContainer, {stateMachine, socket}),
  document.getElementById('root')
)

socket.init()
