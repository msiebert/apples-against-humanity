// @flow
import React, {Component} from 'react'

import styles from 'styles/game/player-block.scss'

type Props = {
  name: string,
  color: string,
  additionalClasses: string,
};
export default class PlayerBlock extends Component {
  props: Props;

  render() {
    const c = `player-block ${this.props.color} ${this.props.additionalClasses}`

    return (
      <div className={c}>
        <h1 className="player-block-name">{this.props.name}</h1>
      </div>
    )
  }
}
