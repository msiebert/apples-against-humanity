// @flow

import Game from '../../../common/models/game'
import Action from '../../../common/state/action'
import {AddPlayerAction} from './actions'

export const initialState = new Game()

type GameTransitionFunction = (currentState: Game, action: Action) => Game;
export const gameTransition: GameTransitionFunction = (
    game: Game = initialState,
    action: Action
) => {
  if (action instanceof AddPlayerAction) {
    return new Game(game.players.push(action.player), game.unusedCards, game.currentJudge)
  } else {
    return game
  }
}
