// @flow
import React, {Component} from 'react'

import styles from 'styles/player/waiting-judge.scss'

export default class WaitingJudge extends Component {
  render() {
    return (
      <div className="waiting-judge">
        <h1>You're the judge!</h1>
        <h3>Waiting for the other players to submit their cards...</h3>
      </div>
    )
  }
}
