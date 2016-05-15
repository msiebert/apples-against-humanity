// @flow
import {Set} from 'immutable'

import Colors from 'common/colors'
import Card from 'common/models/card'

export default class Player {
  name: string;
  color: string;
  cards: Set<Card>;

  constructor(name: ?string, color: ?string, cards: ?Set<Card>) {
    this.name = name || ''
    this.color = color || Colors.none
    this.cards = cards || Set()
  }
}
