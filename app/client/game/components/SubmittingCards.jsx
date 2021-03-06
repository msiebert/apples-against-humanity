// @flow
import {List} from 'immutable'
import React, {Component} from 'react'

import Player from 'common/models/player'

import PlayerBlocks from 'game/components/PlayerBlocks.jsx'
import Prompt from 'game/components/Prompt.jsx'

import styles from 'styles/game/submitting-cards.scss'

type Props = {
  prompt: string,
  players: List<Player>,
  judge: Player,
};
export default class SubmittingCards extends Component {
  props: Props;

  constructor(props: Props) {
    super(props)
  }

  render() {
    const {prompt, judge, players} = this.props
    return (
      <div className="submitting-cards">
        <Prompt prompt={prompt} />
        <h3 className="judge">{judge.name} is the judge!</h3>
        <PlayerBlocks players={players} />
      </div>
    )
  }
}
