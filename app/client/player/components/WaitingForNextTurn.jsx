// @flow
import React, {Component} from 'react'

import styles from 'styles/player/waiting-for-next-turn.scss'

export default class WaitingForNextTurn extends Component {
  render() {
    return (
      <div className="waiting-for-next-turn">
        <h1>Waiting to start the next turn...</h1>
      </div>
    )
  }
}
