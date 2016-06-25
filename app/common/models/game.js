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
  winningCard: string;
}

export default class Game extends GameProperties {
  constructor(
      players: ?List<Player>,
      unusedCards: ?Set<string>,
      unusedPrompts: ?Set<string>,
      currentJudge: ?number,
      serverAddress: ?string,
      status: ?string,
      currentPrompt: ?string,
      winningCard: ?string
  ) {
    super()
    this.players = players || List()
    this.unusedCards = unusedCards || Set()
    this.unusedPrompts = unusedPrompts || Set()
    this.currentJudge = (currentJudge != undefined) ? currentJudge : -1
    this.serverAddress = serverAddress || ''
    this.status = status || GameStatus.start
    this.currentPrompt = currentPrompt || ''
    this.winningCard = winningCard || ''
  }

  copy({
    players,
    unusedCards,
    unusedPrompts,
    currentJudge,
    serverAddress,
    status,
    currentPrompt,
    winningCard,
  }: $Shape<GameProperties>): Game {
    return new Game(
      players || this.players,
      unusedCards || this.unusedCards,
      unusedPrompts || this.unusedPrompts,
      (currentJudge != undefined) ? currentJudge : this.currentJudge,
      serverAddress || this.serverAddress,
      status || this.status,
      currentPrompt || this.currentPrompt,
      winningCard || this.winningCard
    )
  }
}

export const GameStatus = {
  start: 'start',
  selectingContent: 'selecting content',
  distributingCards: 'distributing cards',
  startingTurn: 'starting turn',
  submittingCards: 'submitting cards',
  startingJudging: 'starting judging',
  judging: 'judging',
  showingWinner: 'showing winner',
}
