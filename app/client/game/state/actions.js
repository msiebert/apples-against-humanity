// @flow
import Player from '../../../common/models/player'
import Action from '../../../common/state/action'

export class AddPlayerAction extends Action {
  player: Player;

  constructor(name: string) {
    super()
    this.player = new Player(name)
  }
}
