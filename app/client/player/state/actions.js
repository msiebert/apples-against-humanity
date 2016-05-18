// @flow
import Action from 'common/state/action'

export class SetPlayerColorAction extends Action {
  color: string;

  constructor(color: string) {
    super()
    this.color = color
  }
}

export class SetPlayerNameAction extends Action {
  name: string;

  constructor(name: string) {
    super()
    this.name = name
  }
}
