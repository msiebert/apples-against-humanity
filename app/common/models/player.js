// @flow
import {Set} from 'immutable'

import Card from './card'

export default class Player {
  cards: Set<Card>;

  constructor(cards: ?Set<Card>) {
    this.cards = cards || Set()
  }
}
