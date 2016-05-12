// @flow

import Action from './action'

export default class StateMachine<A> {
  transition: (currentState: A, action: Action) => A;
  currentState: A;

  constructor(transition: (currentState: A, action: Action) => A, initial: A) {
    this.transition = transition;
    this.currentState = initial;
  }

  dispatch(action: Action) {
    this.currentState = this.transition(this.currentState, action)
    console.log(this.currentState)
  }
}
