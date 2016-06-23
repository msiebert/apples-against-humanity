// @flow
import {List} from 'immutable'
import React, {Component} from 'react'

import Player from 'common/models/player'

import PlayerSubmissions from 'game/components/PlayerSubmissions.jsx'
import Prompt from 'game/components/Prompt.jsx'

import styles from 'styles/game/judging-cards.scss'

type Props = {
  prompt: string,
  players: List<Player>,
  judge: Player,
};
export default class JudgingCards extends Component {
  props: Props;

  render() {
    const {prompt, judge, players} = this.props
    return (
      <div className="judging-cards">
        <Prompt prompt={prompt} />
        <h3 className="judge">{judge.name} is picking the winner...</h3>
        <PlayerSubmissions players={players} />
      </div>
    )
  }
}
