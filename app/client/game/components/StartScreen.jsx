// @flow
import {IndexedSeq, List} from 'immutable'
import React, {Component} from 'react'

import Button from 'client/common/components/input/Button.jsx'

import Player from 'common/models/player'

import PlayerBlock from 'game/components/PlayerBlock.jsx'

import styles from 'styles/game/start-screen.scss'
import grid from 'styles/grid.scss'

type Props = {
  players: List<Player>,
  onStart: () => void,
};
export default class StartScreen extends Component {
  props: Props;

  render() {
    const playerRows = this.props.players
      .groupBy((value: Player, index: number) => Math.floor(index / 3))
      .toList()
      .map((players: List<Player>, index: number) => {
        const row = players.map((player: Player) => {
          return <PlayerBlock key={`player-block-${player.name}`} name={player.name}
            color={player.color} additionalClasses="col-4" />
        })

        return <div className="row" key={`player-row-${index}`}>{row}</div>
      })

    let startElement = <p key="waiting-message" className="waiting-message">
      waiting for more players
    </p>
    if (this.props.players.size >= 3) {
      startElement = <Button className="start-button" color="blue" text="Start!"
        onClick={this.props.onStart} />
    }

    return (
      <div className="start-screen">
        <h1 className="start-screen-title">Apples against Humanity</h1>
        {startElement}
        <div className="player-blocks">
          {playerRows}
        </div>
      </div>
    )
  }
}
