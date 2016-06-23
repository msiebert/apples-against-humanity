// @flow
import React, {Component} from 'react'

import styles from 'styles/player/winner.scss'

export default class Winner extends Component {
  render() {
    return (
      <div className="winner">
        <h1>Congrats! You win this turn!</h1>
      </div>
    )
  }
}
