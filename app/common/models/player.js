// @flow
import {Set} from 'immutable'

import Colors from 'common/colors'

class PlayerProperties {
  name: string;
  color: string;
  cards: Set<string>;
  status: string;
  isJudging: boolean;
}

export default class Player extends PlayerProperties {
  constructor(
      name: ?string,
      color: ?string,
      cards: ?Set<string>,
      status: ?string,
      isJudging: ?boolean
  ) {
    super()
    this.name = name || ''
    this.color = color || Colors.none
    this.cards = cards || Set()
    this.status = status || PlayerStatus.loggingIn
    this.isJudging = !!isJudging
  }

  copy({
    name,
    color,
    cards,
    status,
    isJudging
  }: $Shape<PlayerProperties>): Player {
    return new Player(
      name || this.name,
      color || this.color,
      cards || this.cards,
      status || this.status,
      isJudging || this.isJudging
    )
  }
}

export const PlayerStatus = {
  loggingIn: 'logging in',
  pickingCard: 'picking card',
  waiting: 'waiting',
  waitingJudge: 'waiting judge',
}
