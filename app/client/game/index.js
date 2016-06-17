// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader';
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
  <AppContainer>
    <GameContainer stateMachine={stateMachine} socket={socket} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('game/components/GameContainer.jsx', () => {
    const link = document.getElementById('styles')
    if (link instanceof HTMLLinkElement) {
      if (link.href.indexOf('?') != -1) {
        link.href = link.href.substring(0, link.href.indexOf('?'))
      }
      link.href += '?buster=' + new Date().getMilliseconds()
    }

    const NextGameContainer = require('game/components/GameContainer.jsx')
    ReactDOM.render(
      <AppContainer>
        <GameContainer stateMachine={stateMachine} socket={socket} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

socket.init()
