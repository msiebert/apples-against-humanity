// @flow

import React, {Component} from 'react'

import styles from 'styles/player/login.scss'

export default class Login extends Component {
  render() {
    return (
      <div className="player-login">
        <h1>Enter Your Name</h1>
        <input type="text" placeholder="name" />
        <button>Go!</button>
      </div>
    )
  }
}
