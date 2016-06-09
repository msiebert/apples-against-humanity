// @flow
import {List} from 'immutable'
import React, {Component} from 'react'

import Button from 'client/common/components/input/Button.jsx'

import Player from 'common/models/player'

import PlayerBlocks from 'game/components/PlayerBlocks.jsx'

import styles from 'styles/game/start-screen.scss'
import grid from 'styles/grid.scss'

type Props = {
  players: List<Player>,
  onStart: () => void,
  address: string,
};
export default class StartScreen extends Component {
  props: Props;

  render() {
    const {players, onStart, address} = this.props
    let startElement = <p key="waiting-message" className="waiting-message">
      waiting for more players
    </p>
    if (players.size >= 3) {
      startElement = <Button className="start-button" color="blue" text="Start!"
        onClick={onStart} />
    }

    return (
      <div className="start-screen">
        <h1 className="start-screen-title">Apples against Humanity</h1>
        {startElement}
        <h4 className="start-screen-address">
          go to <span className="address">{address}</span> to play
        </h4>
        <PlayerBlocks players={players} />
      </div>
    )
  }
}
