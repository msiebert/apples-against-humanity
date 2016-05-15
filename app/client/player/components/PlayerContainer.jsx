// @flow

import React, {Component} from 'react'

import Player from 'common/models/player'
import {StateMachine, StateProps} from 'common/state/statemachine'

import Login from 'player/components/Login.jsx'

import PlayerColors from 'styles/player/player-colors.scss'

export default class PlayerContainer extends Component {
  constructor(props: StateProps<Player>) {
    super(props)
    props.state.subscribe((state) => {
      this.setState(state)
    })
  }

  componentDidMount() {
    this.setState(this.props.state)
  }

  render() {
    const color = (this.state && this.state.color || '') + ' player-root'

    return(
      <div className={color}>
        <Login />
      </div>
    )
  }
}
