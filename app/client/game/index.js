// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import StateMachine from 'common/state/statemachine'

import GameContainer from 'game/components/GameContainer.jsx'
import Socket from 'game/socket'
import {SetServerAddressAction} from 'game/state/actions'
import {gameTransition, initialState} from 'game/state/transitions'

import styles from 'styles/game/game.scss'

const stateMachine = new StateMachine(gameTransition, initialState)

const socket = new Socket(io.connect(websocketAddress), stateMachine)

stateMachine.dispatch(new SetServerAddressAction(serverAddress))

ReactDOM.render(
  React.createElement(GameContainer, {stateMachine, socket}),
  document.getElementById('root')
)

socket.init()
