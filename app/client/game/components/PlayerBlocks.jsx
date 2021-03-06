// @flow
import {List} from 'immutable'
import React, {Component} from 'react'

import Player, {PlayerStatus} from 'common/models/player'

import ColoredBlock from 'game/components/ColoredBlock.jsx'

import grid from 'styles/grid.scss'

type Props = {
  players: List<Player>,
};
export default class PlayerBlocks extends Component {
  props: Props;

  render() {
    const {players} = this.props
    const playerRows = players
      .groupBy((value: Player, index: number) => Math.floor(index / 3))
      .toList()
      .map((players: List<Player>, index: number) => {
        const row = players.map((player: Player) => {
          const stillPicking = player.status == PlayerStatus.pickingCard ?
            ' still-picking' : ''
          return <ColoredBlock key={`player-block-${player.name}`} color={player.color}
            additionalClasses={`col-4${stillPicking}`}>
            <h1 className="player-block-name">{player.name}</h1>
          </ColoredBlock>
        })

        return <div className="row" key={`player-row-${index}`}>{row}</div>
      })

    return (
      <div className="player-blocks">{playerRows}</div>
    )
  }
}
