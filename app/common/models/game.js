// @flow
import {List, Set} from 'immutable'

import Card from './card'
import Player from './player'

export default class Game {
  players: List<Player>;
  unusedCards: Set<Card>;
  currentJudge: ?Player;
  serverAddress: string;

  constructor(
      players: ?List<Player>,
      unusedCards: ?Set<Card>,
      currentJudge: ?Player,
      serverAddress: ?string
  ) {
    this.players = players || List()
    this.unusedCards = unusedCards || Set()
    this.currentJudge = currentJudge
    this.serverAddress = serverAddress || ''
  }
}
