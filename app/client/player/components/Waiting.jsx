// @flow

import React, {Component} from 'react'

import styles from 'styles/player/waiting.scss'

export default class Waiting extends Component {
  render() {
    return (
      <div className="waiting">
        <h1>Waiting for other players...</h1>
      </div>
    )
  }
}
