// @flow
import React, {Component} from 'react'

import * as commonActions from 'client/common/state/actions'

import Player, {PlayerStatus} from 'common/models/player'
import StateMachine from 'common/state/statemachine'

import Header from 'player/components/Header.jsx'
import Judging from 'player/components/Judging.jsx'
import Login from 'player/components/Login.jsx'
import PickingCard from 'player/components/PickingCard.jsx'
import Socket from 'player/socket'
import * as actions from 'player/state/actions'
import Waiting from 'player/components/Waiting.jsx'
import WaitingJudge from 'player/components/WaitingJudge.jsx'

import PlayerColors from 'styles/player/player-colors.scss'

type Props = {
  stateMachine: StateMachine<Player>,
  socket: Socket,
};
type State = {
  player: Player,
};
export default class PlayerContainer extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props)
    this.state = {
      player: this.props.stateMachine.currentState,
    }

    props.stateMachine.subscribe((player: Player) => {
      this.setState({player})
    })
  }

  onLogin(name: string): void {
    if (name != '') {
      this.props.stateMachine.dispatch(new actions.SetPlayerNameAction(name))
      this.props.socket.loginPlayer(name, this.state.player.color)
    }
  }

  onSelectCard(card: string): void {
    this.props.stateMachine.dispatch(
      new commonActions.SelectCardAction(this.state.player.name, card)
    )
    this.props.socket.selectCard(this.state.player.name, card)
  }

  onSelectWinner(card: string): void {
    this.props.socket.selectWinner(card)
  }

  render() {
    const color = this.state && this.state.player.color || ''

    let child = null
    if (this.state.player.status == PlayerStatus.loggingIn) {
      child = <Login key='player-login' color={color}
        onLogin={this.onLogin.bind(this)} />
    } else if (this.state.player.status == PlayerStatus.waitingJudge) {
      child = <WaitingJudge />
    } else if (this.state.player.status == PlayerStatus.pickingCard) {
      child = <PickingCard cards={this.state.player.cards}
        selectCard={this.onSelectCard.bind(this)} />
    } else if (this.state.player.status == PlayerStatus.judging) {
      child = <Judging cards={this.state.player.cardsToJudge}
        selectCard={this.onSelectWinner.bind(this)} />
    } else {
      child = <Waiting key='player-waiting' />
    }

    let header = null
    if (this.state.player.name != '') {
      header = <Header title={this.state.player.name} />
    }

    return(
      <div className={`${color} player-root`}>
        {header}
        {child}
      </div>
    )
  }
}
