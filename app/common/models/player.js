// @flow
import {Set} from 'immutable'

import Card from './card'

export default class Player {
  name: string;
  cards: Set<Card>;

  constructor(name: string, cards: ?Set<Card>) {
    this.name = name
    this.cards = cards || Set()
  }
}
