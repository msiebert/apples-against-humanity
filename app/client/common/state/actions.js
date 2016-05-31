// @flow
import Action from 'common/state/action'

export class GivePlayerCardAction extends Action {
  playerName: string;
  card: string;

  constructor(playerName: string, card: string) {
    super()
    this.playerName = playerName
    this.card = card
  }
}
