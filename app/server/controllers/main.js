// @flow

import * as config from '../../common/config'

/**
 * Serve up the pages for the game.
 */
export default class MainController {
  websocketAddress: string;

  constructor(ipAddress: string) {
    this.websocketAddress = `${ipAddress}:${config.websocketPort}`
  }

  game(response: ExpressResponse) {
    response.render('game', {
      websocketAddress: this.websocketAddress,
    })
  }

  player(response: ExpressResponse) {
    response.render('player', {
      websocketAddress: this.websocketAddress,
    })
  }
}
