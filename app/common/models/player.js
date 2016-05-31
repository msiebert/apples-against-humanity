// @flow
import {Set} from 'immutable'

import Colors from 'common/colors'

class PlayerProperties {
  name: string;
  color: string;
  cards: Set<string>;
  status: string;
}

export default class Player extends PlayerProperties {
  constructor(name: ?string, color: ?string, cards: ?Set<string>, status: ?string) {
    super()
    this.name = name || ''
    this.color = color || Colors.none
    this.cards = cards || Set()
    this.status = status || PlayerStatus.loggingIn
  }

  copy({
    name,
    color,
    cards,
    status
  }: $Shape<PlayerProperties>): Player {
    return new Player(
      name || this.name,
      color || this.color,
      cards || this.cards,
      status || this.status
    )
  }
}

export const PlayerStatus = {
  loggingIn: 'logging in',
  waiting: 'waiting',
}
