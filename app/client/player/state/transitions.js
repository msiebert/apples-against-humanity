// @flow
import * as commonActions from 'client/common/state/actions'
import * as transitions from 'client/common/state/transitions'

import Action from 'common/state/action'
import Player, {PlayerStatus} from 'common/models/player'

import * as actions from 'player/state/actions'

export const initialState = new Player()

type TransitionFunction = (currentState: Player, action: Action) => Player;
export const playerTransition: TransitionFunction = (
  player: Player = initialState,
  action: Action
) => {
  if (action instanceof actions.SetPlayerColorAction) {
    return player.copy({color: action.color})
  } else if (action instanceof actions.SetPlayerNameAction) {
    return player.copy({name: action.name, status: PlayerStatus.waiting})
  } else if (action instanceof commonActions.GivePlayerCardAction) {
    if (action.playerName == player.name) {
      return player.copy({cards: player.cards.add(action.card)})
    } else {
      return player
    }
  } else if (action instanceof commonActions.SetJudgeAction) {
    if (action.playerName == player.name) {
      return player.copy({isJudging: true})
    } else {
      return player.copy({isJudging: false})
    }
  } else if (action instanceof actions.StartTurnAction) {
    return player.copy({
      status: player.isJudging ?
        PlayerStatus.waitingJudge : PlayerStatus.pickingCard,
    })
  } else if (action instanceof commonActions.SelectCardAction) {
    return transitions.selectCard(player, action)
  } else if (action instanceof commonActions.StartJudgingAction) {
    return transitions.startJudging(player, action)
  } else if (action instanceof actions.EndTurnAction) {
    if (player.selectedCard == action.card) {
      return player.copy({status: PlayerStatus.isWinner})
    } else {
      return player.copy({status: PlayerStatus.waitingForNextTurn})
    }
  } else {
    return player
  }
}
