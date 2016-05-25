// @flow
import Player from '../../../common/models/player'
import Action from '../../../common/state/action'

export class LoginPlayerAction extends Action {
  player: Player;

  constructor(name: string, color: string) {
    super()
    this.player = new Player(name, color)
  }
}

export class SetServerAddressAction extends Action {
  address: string;

  constructor(address: string) {
    super()
    this.address = address
  }
}
