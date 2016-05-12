// @flow

import Action from './action'

export default class StateMachine<A> {
  transition: (currentState: A, action: Action) => A;
  currentState: A;

  constructor(transition: (currentState: A, action: Action) => A) {
    this.transition = transition;
  }
}
