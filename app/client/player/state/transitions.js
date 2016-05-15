// @flow
import Action from 'common/state/action'
import Player from 'common/models/player'

import {SetPlayerColorAction} from 'player/state/actions'

export const initialState = new Player()

type TransitionFunction = (currentState: Player, action: Action) => Player;
export const playerTransition: TransitionFunction = (
  player: Player = initialState,
  action: Action
) => {
  if (action instanceof SetPlayerColorAction) {
    return new Player(player.name, action.color, player.cards)
  } else {
    return player
  }
}
