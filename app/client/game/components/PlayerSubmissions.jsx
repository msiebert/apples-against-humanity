// @flow
import {List} from 'immutable'
import React, {Component} from 'react'

import Player from 'common/models/player'

import ColoredBlock from 'game/components/ColoredBlock.jsx'

import grid from 'styles/grid.scss'
import styles from 'styles/game/player-submissions.scss'

type Props = {
  players: List<Player>,
};
export default class PlayerSubmissions extends Component {
  props: Props;

  render() {
    const {players} = this.props
    const playerRows = players
      .groupBy((value: Player, index: number) => Math.floor(index / 3))
      .toList()
      .map((players: List<Player>, index: number) => {
        const row = players.map((player: Player) => {
          return <ColoredBlock key={`player-submission-${player.name}`} color={player.color}
            additionalClasses="col-4">
            <h1 className="player-submission-card">{player.selectedCard}</h1>
          </ColoredBlock>
        })

        return <div className="row" key={`player-row-${index}`}>{row}</div>
      })

      return (
        <div className="player-submissions">{playerRows}</div>
      )
  }
}
