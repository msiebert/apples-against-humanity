// @flow
import {List, Set} from 'immutable'

import Player from 'common/models/player'
import Action from 'common/state/action'

export class LoginPlayerAction extends Action {
  player: Player;

  constructor(name: string, color: string) {
    super()
    this.player = new Player(name, color)
  }
}

export class SetServerAddressAction extends Action {
  address: string;

  constructor(address: string) {
    super()
    this.address = address
  }
}

export class StartSelectingContentAction extends Action {}

export class AddContentAction extends Action {
  cards: Set<string>;
  prompts: Set<string>;

  constructor(cards: Set<string>, prompts: Set<string>) {
    super()
    this.cards = cards
    this.prompts = prompts
  }
}

export class StartTurnAction extends Action {}

export class SelectWinnerAction extends Action {
  card: string;

  constructor(card: string) {
    super()
    this.card = card
  }
}
