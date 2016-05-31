// @flow
import * as commonActions from 'client/common/state/actions'

import * as config from 'common/config'
import Player from 'common/models/player'
import SocketCommands from 'common/socketcommands'
import * as socketData from 'common/socketcommands'
import StateMachine from 'common/state/statemachine'

import {SetPlayerColorAction} from 'player/state/actions'

export default class Socket {
  socket: SocketIO;
  state: StateMachine<Player>;
  init: () => void;

  constructor(socket: SocketIO, state: StateMachine<Player>) {
    this.socket = socket
    this.state = state
  }

  init(): void {
    this.socket.on('connect', () => {
      this.socket.emit(SocketCommands.joinRoom, config.playerEventsRoom)
    })

    this.socket.on(SocketCommands.setPlayerColor, (color: string) => {
      this.state.dispatch(new SetPlayerColorAction(color))
    })

    this.socket.on(
      SocketCommands.givePlayerCard,
      (data: socketData.GivePlayerCardData): void => {
        this.state.dispatch(
          new commonActions.GivePlayerCardAction(data.name, data.card)
        )
      }

    )
  }

  loginPlayer(name: string, color: string): void {
    this.socket.emit(SocketCommands.loginPlayer, {
      name,
      color,
      room: config.gameEventsRoom,
    })
  }
}
