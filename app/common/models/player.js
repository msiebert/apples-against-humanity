// @flow
import {List, Set} from 'immutable'

import Colors from 'common/colors'

class PlayerProperties {
  name: string;
  color: string;
  cards: Set<string>;
  status: string;
  isJudging: boolean;
  selectedCard: string;
  cardsToJudge: List<string>;
}

export default class Player extends PlayerProperties {
  constructor(
      name: ?string,
      color: ?string,
      cards: ?Set<string>,
      status: ?string,
      isJudging: ?boolean,
      selectedCard: ?string,
      cardsToJudge: ?List<string>
  ) {
    super()
    this.name = name || ''
    this.color = color || Colors.none
    this.cards = cards || Set()
    this.status = status || PlayerStatus.loggingIn
    this.isJudging = !!isJudging
    this.selectedCard = selectedCard || ''
    this.cardsToJudge = cardsToJudge || List()
  }

  copy({
    name,
    color,
    cards,
    status,
    isJudging,
    selectedCard,
    cardsToJudge
  }: $Shape<PlayerProperties>): Player {
    return new Player(
      name || this.name,
      color || this.color,
      cards || this.cards,
      status || this.status,
      isJudging || this.isJudging,
      selectedCard || this.selectedCard,
      cardsToJudge || this.cardsToJudge
    )
  }
}

export const PlayerStatus = {
  loggingIn: 'logging in',
  pickingCard: 'picking card',
  waiting: 'waiting',
  waitingJudge: 'waiting judge',
  judging: 'judging',
}
