// @flow
import {Set} from 'immutable'
import React, {Component} from 'react'

import * as commonActions from 'client/common/state/actions'

import * as config from 'common/config'
import Game, {GameStatus} from 'common/models/game'
import Player from 'common/models/player'
import StateMachine from 'common/state/statemachine'

import ContentSelection from 'game/components/ContentSelection.jsx'
import JudgingCards from 'game/components/JudgingCards.jsx'
import StartScreen from 'game/components/StartScreen.jsx'
import SubmittingCards from 'game/components/SubmittingCards.jsx'
import WinningCard from 'game/components/WinningCard.jsx'
import Socket from 'game/socket'
import * as actions from 'game/state/actions'

type Props = {
  stateMachine: StateMachine<Game>,
  socket: Socket,
};
type State = {
  game: Game,
};
export default class GameContainer extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props)
    this.state = {
      game: this.props.stateMachine.currentState,
    }

    props.stateMachine.subscribe((game: Game) => {
      this.setState({game})

      if (game.status == GameStatus.showingWinner) {
        setTimeout(() => {
          this.givePlayersCards()
          this.startTurn()
        }, 5000)
      } else if (game.status == GameStatus.startingTurn) {
        const {game} = this.state
        this.props.socket.setJudge(game.players.get(game.currentJudge).name)
        this.props.socket.startTurn()
        props.stateMachine.dispatch(new actions.TurnStartedAction())
      }
    })
  }

  render() {
    const game = this.state.game
    let child = null
    if (game.status == GameStatus.start) {
      child = <StartScreen key="game-start-screen" players={game.players}
        address={game.serverAddress} onStart={this.onStart.bind(this)} />
    } else if (game.status == GameStatus.selectingContent) {
      child = <ContentSelection key="game-content-selection"
        loadContentPacks={this.loadContentPacks.bind(this)} />
    } else if (game.status == GameStatus.startingTurn || game.status == GameStatus.submittingCards ||
        game.status == GameStatus.judging) {
      const players = game.players.filterNot((p: Player): boolean => {
        return p.isJudging
      })
      const judge = game.players.filter((p: Player): boolean => {
        return p.isJudging
      }).get(0)

      if (game.status == GameStatus.startingTurn || game.status == GameStatus.submittingCards) {
        child = <SubmittingCards key="game-submitting-cards"
          prompt={game.currentPrompt} players={players} judge={judge} />
      } else {
        child = <JudgingCards key="game-judging-cards"
          prompt={game.currentPrompt} players={players} judge={judge} />
      }
    } else if (game.status == GameStatus.showingWinner) {
      const winner = game.players.find((p: Player): boolean => p.selectedCard == game.winningCard)
      if (winner) {
        child = <WinningCard key="game-winning-card" color={winner.color} winner={winner.name}
          prompt={game.currentPrompt} card={game.winningCard} />
      }
    }

    return (
      <div className="game-root">
        {child}
      </div>
    )
  }

  onStart() {
    this.props.stateMachine.dispatch(new actions.StartSelectingContentAction())
  }

  loadContentPacks(cards: Set<string>, prompts: Set<string>): void {
    this.props.stateMachine.dispatch(new actions.AddContentAction(cards, prompts))
    this.givePlayersCards()
    this.startTurn()
  }

  givePlayersCards(): void {
    const {game} = this.state
    game.players.forEach((player: Player) => {
      if (player.cards.size < config.maximumCards) {
        for (var i = 0; i < config.maximumCards - player.cards.size; i++) {
          const unusedCards = game.unusedCards.toList()
          const card = unusedCards.get(Math.random() * unusedCards.size)
          this.props.stateMachine.dispatch(
            new commonActions.GivePlayerCardAction(player.name, card)
          )
          this.props.socket.givePlayerCard(player.name, card)
        }
      }
    })
  }

  startTurn(): void {
    this.props.stateMachine.dispatch(new actions.StartTurnAction())
  }
}
