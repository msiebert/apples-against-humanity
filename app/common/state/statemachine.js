// @flow

import {List} from 'immutable'

import Action from 'common/state/action'

export default class StateMachine<A> {
  transition: (currentState: A, action: Action) => A;
  currentState: A;
  listeners: List<(state: A) => void>;

  constructor(transition: (currentState: A, action: Action) => A, initial: A) {
    this.transition = transition
    this.currentState = initial
    this.listeners = List()
  }

  dispatch(action: Action) {
    this.currentState = this.transition(this.currentState, action)
    console.log(this.currentState)
    this.listeners.forEach((listener) => {
      listener(this.currentState)
      return true
    })
  }

  subscribe(listener: (state: A) => void) {
    this.listeners = this.listeners.push(listener)
  }
}
