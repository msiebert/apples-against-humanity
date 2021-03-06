// @flow
import {List} from 'immutable'
import React, {Component} from 'react'
import ReactSwipe from 'react-swipe'

import Card from 'player/components/Card.jsx'

import styles from 'styles/player/swiping-cards.scss'

type Props = {
  cards: List<string>,
  selectCard: (card: string) => void,
};
export default class Judging extends Component {
  props: Props;

  render() {
    const {cards} = this.props
    return (
      <div className="player-cards">
        <ReactSwipe className="swipe" key={cards.size} swipeOptions={{continuous: true}}>
          {cards.map((card: string) => {
            return <Card text={card} key={card.substring(0, 100)}
                onClickCard={this.onClickCard.bind(this)} />
          })}
        </ReactSwipe>
        <h3 className="swipe-instructions">Swipe to see other cards. Tap to select the winner.</h3>
      </div>
    )
  }

  onClickCard(card: string): void {
    this.props.selectCard(card)
  }
}
