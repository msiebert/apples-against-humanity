// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader';
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
  <AppContainer>
    <PlayerContainer stateMachine={stateMachine} socket={socket} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('player/components/PlayerContainer.jsx', () => {
    const link = document.getElementById('styles')
    if (link instanceof HTMLLinkElement) {
      if (link.href.indexOf('?') != -1) {
        link.href = link.href.substring(0, link.href.indexOf('?'))
      }
      link.href += '?buster=' + new Date().getMilliseconds()
    }

    const NextPlayerContainer = require('player/components/PlayerContainer.jsx')
    ReactDOM.render(
      <AppContainer>
        <PlayerContainer stateMachine={stateMachine} socket={socket} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

socket.init()
