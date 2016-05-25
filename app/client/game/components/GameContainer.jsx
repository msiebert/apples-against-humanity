// @flow
import React, {Component} from 'react'

import Game from 'common/models/game'
import StateMachine from 'common/state/statemachine'

import StartScreen from 'game/components/StartScreen.jsx'

type Props = {
  stateMachine: StateMachine<Game>,
};
type State = {
  game: Game,
};
export default class GameContainer extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props)
    this.state = {
      game: this.props.stateMachine.currentState,
    }

    props.stateMachine.subscribe((game: Game) => {
      this.setState({game})
    })
  }

  render() {
    return(
      <div className="game-root">
        <StartScreen players={this.state.game.players}
          address={this.state.game.serverAddress}
          onStart={this.onStart.bind(this)} />
      </div>
    )
  }

  onStart() {
    console.log('here!')
  }
}
