// @flow
import {List, Set} from 'immutable'

import Card from './card'
import Player from './player'

export default class Game {
  players: List<Player>;
  unusedCards: Set<Card>;
  currentJudge: ?Player;

  constructor(
      players: ?List<Player>,
      unusedCards: ?Set<Card>,
      currentJudge: ?Player
  ) {
    this.players = players || List()
    this.unusedCards = unusedCards || Set()
    this.currentJudge = currentJudge
  }
}
