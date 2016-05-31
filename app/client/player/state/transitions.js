// @flow
import * as commonActions from 'client/common/state/actions'

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
  } else {
    return player
  }
}
