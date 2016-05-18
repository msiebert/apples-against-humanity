// @flow
import React, {Component} from 'react'

import Player from 'common/models/player'
import StateMachine from 'common/state/statemachine'

import Login from 'player/components/Login.jsx'
import Socket from 'player/socket'
import {SetPlayerNameAction} from 'player/state/actions'

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

    return(
      <div className={`${color} player-root`}>
        <Login color={color} onLogin={this.onLogin.bind(this)} />
      </div>
    )
  }
}
