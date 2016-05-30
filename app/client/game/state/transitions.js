// @flow

import Game, {GameStatus} from 'common/models/game'
import Action from 'common/state/action'
import * as actions from 'game/state/actions'

export const initialState = new Game()

type GameTransitionFunction = (currentState: Game, action: Action) => Game;
export const gameTransition: GameTransitionFunction = (
    game: Game = initialState,
    action: Action
) => {
  if (action instanceof actions.LoginPlayerAction) {
    return game.copy({players: game.players.push(action.player)})
  } else if (action instanceof actions.SetServerAddressAction) {
    return game.copy({serverAddress: action.address})
  } else if (action instanceof actions.StartSelectingContentAction) {
    return game.copy({status: GameStatus.selectingContent})
  } else if (action instanceof actions.AddContentAction) {
    return game.copy({
      unusedCards: game.unusedCards.union(action.cards),
      unusedPrompts: game.unusedPrompts.union(action.prompts),
    })
  } else {
    return game
  }
}
