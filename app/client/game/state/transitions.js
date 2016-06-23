// @flow
import {List} from 'immutable'

import * as commonActions from 'client/common/state/actions'
import * as transitions from 'client/common/state/transitions'

import Game, {GameStatus} from 'common/models/game'
import Player, {PlayerStatus} from 'common/models/player'
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
  } else if (action instanceof actions.StartTurnAction) {
    const nextJudgeIndex = (game.currentJudge + 1) % game.players.size
    const unusedPrompts = game.unusedPrompts.toList()
    const nextPrompt = unusedPrompts.get(Math.random() * unusedPrompts.size)
    return game.copy({
      currentJudge: nextJudgeIndex,
      status: GameStatus.submittingCards,
      unusedPrompts: game.unusedPrompts.delete(nextPrompt),
      currentPrompt: nextPrompt,
      players: game.players.map((player: Player, index: number): Player => {
        return player.copy({
          status: index == nextJudgeIndex ?
            PlayerStatus.waitingJudge : PlayerStatus.pickingCard,
          isJudging: index == nextJudgeIndex,
        })
      })
    })
  } else if (action instanceof commonActions.SelectCardAction) {
    const players = game.players.map((player: Player): Player => {
      if (action instanceof commonActions.SelectCardAction) {
        return transitions.selectCard(player, action)
      } else return player
    })
    const allSelected = players.every((p: Player): boolean =>
      p.selectedCard.length > 0 || p.isJudging
    )
    let updatedPlayers = players
    if (allSelected) {
      updatedPlayers = players.map((player: Player): Player => {
        if (player.isJudging) return player.copy({status: PlayerStatus.judging})
        else return player
      })
    }
    return game.copy({
      players: updatedPlayers,
      status: allSelected ? GameStatus.startingJudging : game.status,
    })
  } else if (action instanceof commonActions.StartJudgingAction) {
    return game.copy({
      status: GameStatus.judging,
      players: game.players.map((p: Player): Player => {
        if (action instanceof commonActions.StartJudgingAction) {
          return transitions.startJudging(p, action)
        } else return p
      })
    })
  } else if (action instanceof actions.SelectWinnerAction) {
    return game.copy({
      status: GameStatus.showingWinner,
      winningCard: action.card,
    })
  } else {
    return game
  }
}
