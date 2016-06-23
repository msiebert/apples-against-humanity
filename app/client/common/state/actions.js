// @flow
import {List} from 'immutable'

import Action from 'common/state/action'

export class GivePlayerCardAction extends Action {
  playerName: string;
  card: string;

  constructor(playerName: string, card: string) {
    super()
    this.playerName = playerName
    this.card = card
  }
}

export class SetJudgeAction extends Action {
  playerName: string;

  constructor(playerName: string) {
    super()
    this.playerName = playerName
  }
}

export class SelectCardAction extends Action {
  name: string;
  card: string;

  constructor(name: string, card: string) {
    super()
    this.name = name
    this.card = card
  }
}

export class StartJudgingAction extends Action {
  cards: List<string>;

  constructor(cards: List<string>) {
    super()
    this.cards = cards
  }
}
