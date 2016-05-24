// @flow
import {Set} from 'immutable'

import Colors from 'common/colors'
import Card from 'common/models/card'

export default class Player {
  name: string;
  color: string;
  cards: Set<Card>;
  status: string;

  constructor(name: ?string, color: ?string, cards: ?Set<Card>, status: ?string) {
    this.name = name || ''
    this.color = color || Colors.none
    this.cards = cards || Set()
    this.status = status || PlayerStatus.loggingIn
  }
}

export const PlayerStatus = {
  loggingIn: 'logging in',
  waiting: 'waiting',
}
