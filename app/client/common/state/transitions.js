// @flow
import * as commonActions from 'client/common/state/actions'

import Player, {PlayerStatus} from 'common/models/player'

export const selectCard = (player: Player, action: commonActions.SelectCardAction): Player => {
  if (action.name == player.name) {
    return player.copy({
      status: PlayerStatus.waiting,
      cards: player.cards.remove(action.card),
      selectedCard: action.card,
    })
  } else {
    return player
  }
}

export const startJudging = (player: Player, action: commonActions.StartJudgingAction): Player => {
  if (player.isJudging) {
    return player.copy({
      status: PlayerStatus.judging,
      cardsToJudge: action.cards
    })
  } else {
    return player
  }
}
