// @flow
import {List, Set} from 'immutable'

import Player from './player'

class GameProperties {
  players: List<Player>;
  unusedCards: Set<string>;
  unusedPrompts: Set<string>;
  currentJudge: number;
  serverAddress: string;
  status: string;
  currentPrompt: string;
}

export default class Game extends GameProperties {
  constructor(
      players: ?List<Player>,
      unusedCards: ?Set<string>,
      unusedPrompts: ?Set<string>,
      currentJudge: ?number,
      serverAddress: ?string,
      status: ?string,
      currentPrompt: ?string
  ) {
    super()
    this.players = players || List()
    this.unusedCards = unusedCards || Set()
    this.unusedPrompts = unusedPrompts || Set()
    this.currentJudge = currentJudge || -1
    this.serverAddress = serverAddress || ''
    this.status = status || GameStatus.start
    this.currentPrompt = currentPrompt || ''
  }

  copy({
    players,
    unusedCards,
    unusedPrompts,
    currentJudge,
    serverAddress,
    status,
    currentPrompt
  }: $Shape<GameProperties>): Game {
    return new Game(
      players || this.players,
      unusedCards || this.unusedCards,
      unusedPrompts || this.unusedPrompts,
      currentJudge || this.currentJudge,
      serverAddress || this.serverAddress,
      status || this.status,
      currentPrompt || this.currentPrompt
    )
  }
}

export const GameStatus = {
  start: 'start',
  selectingContent: 'selecting content',
  submittingCards: 'submitting cards',
}
