// @flow
import {List, Set} from 'immutable'

import Player from './player'

class GameProperties {
  players: List<Player>;
  unusedCards: Set<string>;
  unusedPrompts: Set<string>;
  currentJudge: ?Player;
  serverAddress: string;
  status: string;
}

export default class Game extends GameProperties {
  constructor(
      players: ?List<Player>,
      unusedCards: ?Set<string>,
      unusedPrompts: ?Set<string>,
      currentJudge: ?Player,
      serverAddress: ?string,
      status: ?string
  ) {
    super()
    this.players = players || List()
    this.unusedCards = unusedCards || Set()
    this.unusedPrompts = unusedPrompts || Set()
    this.currentJudge = currentJudge
    this.serverAddress = serverAddress || ''
    this.status = status || GameStatus.start
  }

  copy({
    players,
    unusedCards,
    unusedPrompts,
    currentJudge,
    serverAddress,
    status
  }: $Shape<GameProperties>) {
    return new Game(
      players || this.players,
      unusedCards || this.unusedCards,
      unusedPrompts || this.unusedPrompts,
      currentJudge || this.currentJudge,
      serverAddress || this.serverAddress,
      status || this.status
    )
  }
}

export const GameStatus = {
  start: 'start',
  selectingContent: 'selecting content',
}
