// @flow
import Action from 'common/state/action'

export class SetPlayerColorAction extends Action {
  color: string;

  constructor(color: string) {
    super()
    this.color = color
  }
}
