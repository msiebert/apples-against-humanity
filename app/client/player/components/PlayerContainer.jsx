// @flow
import React, {Component} from 'react'

import Player, {PlayerStatus} from 'common/models/player'
import StateMachine from 'common/state/statemachine'

import Header from 'player/components/Header.jsx'
import Login from 'player/components/Login.jsx'
import Socket from 'player/socket'
import {SetPlayerNameAction} from 'player/state/actions'
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
      this.props.stateMachine.dispatch(new SetPlayerNameAction(name))
      this.props.socket.loginPlayer(name, this.state.player.color)
    }
  }

  render() {
    const color = this.state && this.state.player.color || ''

    let child = null
    if (this.state.player.status == PlayerStatus.loggingIn) {
      child = <Login key='player-login' color={color}
        onLogin={this.onLogin.bind(this)} />
    } else if (this.state.player.status == PlayerStatus.waitingJudge) {
      child = <WaitingJudge />
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
