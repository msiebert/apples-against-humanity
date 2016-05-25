// @flow

import Game from 'common/models/game'
import Action from 'common/state/action'
import * as actions from 'game/state/actions'

export const initialState = new Game()

type GameTransitionFunction = (currentState: Game, action: Action) => Game;
export const gameTransition: GameTransitionFunction = (
    game: Game = initialState,
    action: Action
) => {
  if (action instanceof actions.LoginPlayerAction) {
    return new Game(
      game.players.push(action.player),
      game.unusedCards,
      game.currentJudge,
      game.serverAddress
    )
  } else if (action instanceof actions.SetServerAddressAction) {
    return new Game(
      game.players,
      game.unusedCards,
      game.currentJudge,
      action.address
    )
  } else {
    return game
  }
}
