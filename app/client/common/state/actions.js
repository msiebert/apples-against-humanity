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

export class SetJudgeAction extends Action {
  playerName: string;

  constructor(playerName: string) {
    super()
    this.playerName = playerName
  }
}