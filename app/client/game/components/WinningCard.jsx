// @flow
import React, {Component} from 'react'

import ColoredBlock from 'game/components/ColoredBlock.jsx'
import Prompt from 'game/components/Prompt.jsx'

import styles from 'styles/game/winning-card.scss'

type Props = {
  prompt: string,
  color: string,
  winner: string,
  card: string,
};
export default class WinningCard extends Component {
  props: Props;

  render() {
    const {prompt, color, winner, card} = this.props
    return (
      <div className="winning-card">
        <Prompt prompt={prompt} />
        <h1 className="winner-is">and the winner is...</h1>
        <ColoredBlock key="winning-card" color={color} additionalClasses="">
          <h3 className="winning-card-winner">{winner}</h3>
          <h1 className="winning-card-text">{card}</h1>
        </ColoredBlock>
      </div>
    )
  }
}
