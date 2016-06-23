// @flow
import React, {Component} from 'react'

import styles from 'styles/player/card.scss'

type Props = {
  text: string,
  onClickCard: (card: string) => void
};
export default class Card extends Component {
  props: Props;

  render() {
    const {text, onClickCard} = this.props
    return (
      <div className="card-outer">
        <div className="card-wrapper">
          <div className="card" onClick={() => onClickCard(text)}>
            <h3 className="text">{this.props.text}</h3>
          </div>
        </div>
      </div>
    )
  }
}
