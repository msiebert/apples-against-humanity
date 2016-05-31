// @flow
import * as config from 'common/config'
import Game from 'common/models/game'
import SocketCommands, {LoginPlayerData} from 'common/socketcommands'
import StateMachine from 'common/state/statemachine'

import {LoginPlayerAction} from 'game/state/actions'

export default class Socket {
  socket: SocketIO;
  state: StateMachine<Game>;

  constructor(socket: SocketIO, state: StateMachine<Game>) {
    this.socket = socket
    this.state = state
  }

  init(): void {
    this.socket.on('connect', () => {
      this.socket.emit(SocketCommands.joinRoom, config.gameEventsRoom)
    })

    this.socket.on(SocketCommands.loginPlayer, (data: LoginPlayerData) => {
      this.state.dispatch(new LoginPlayerAction(data.name, data.color))
    })
  }

  givePlayerCard(name: string, card: string): void {
    this.socket.emit(SocketCommands.givePlayerCard, {
      name,
      card,
      room: config.playerEventsRoom
    })
  }
}
