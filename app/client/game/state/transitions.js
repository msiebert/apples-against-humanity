// @flow
import {List} from 'immutable'

import * as commonActions from 'client/common/state/actions'

import Game, {GameStatus} from 'common/models/game'
import Player from 'common/models/player'
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
  } else if (action instanceof commonActions.GivePlayerCardAction) {
    const {playerName, card} = action
    const unusedCards = game.unusedCards.delete(card)
    const players = game.players.map((player: Player): Player => {
      if (player.name == playerName) {
        return player.copy({cards: player.cards.add(card)})
      } else {
        return player
      }
    })
    return game.copy({
      unusedCards: unusedCards,
      players: players
    })
  } else {
    return game
  }
}
