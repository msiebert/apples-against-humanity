// @flow
import {List} from 'immutable'

import * as commonActions from 'client/common/state/actions'

import * as config from 'common/config'
import Game, {GameStatus} from 'common/models/game'
import Player from 'common/models/player'
import SocketCommands from 'common/socketcommands'
import * as socketData from 'common/socketcommands'
import StateMachine from 'common/state/statemachine'

import * as actions from 'game/state/actions'

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

    this.socket.on(SocketCommands.loginPlayer, (data: socketData.LoginPlayerData) => {
      this.state.dispatch(new actions.LoginPlayerAction(data.name, data.color))
    })

    this.socket.on(SocketCommands.selectCard, (data: socketData.SelectCardData) => {
      this.state.dispatch(new commonActions.SelectCardAction(data.name, data.card))
    })

    this.socket.on(SocketCommands.selectWinner, (data: socketData.SelectWinnerData) => {
      this.state.dispatch(new actions.SelectWinnerAction(data.card))
    })

    this.state.subscribe((game: Game): void => {
      if (game.status == GameStatus.startingJudging) {
        const cards = game.players.filterNot((p: Player): boolean => p.isJudging)
          .map((p: Player): string => p.selectedCard)
        this.state.dispatch(new commonActions.StartJudgingAction(cards))
        this.startJudging(cards)
      }
    })
  }

  givePlayerCard(name: string, card: string): void {
    this.socket.emit(SocketCommands.givePlayerCard, {
      name,
      card,
      room: config.playerEventsRoom
    })
  }

  setJudge(name: string): void {
    this.socket.emit(SocketCommands.setJudge, {
      name,
      room: config.playerEventsRoom,
    })
  }

  startJudging(cards: List<string>): void {
    this.socket.emit(SocketCommands.startJudging, {
      cards: cards.toJS(),
      room: config.playerEventsRoom,
    })
  }

  startTurn(): void {
    this.socket.emit(SocketCommands.startTurn, {
      room: config.playerEventsRoom,
    })
  }
}
