// @flow
import Action from 'common/state/action'
import Player from 'common/models/player'

import * as actions from 'player/state/actions'

export const initialState = new Player()

type TransitionFunction = (currentState: Player, action: Action) => Player;
export const playerTransition: TransitionFunction = (
  player: Player = initialState,
  action: Action
) => {
  if (action instanceof actions.SetPlayerColorAction) {
    return new Player(player.name, action.color, player.cards)
  } else if (action instanceof actions.SetPlayerNameAction) {
    return new Player(action.name, player.color, player.cards)
  } else {
    return player
  }
}
