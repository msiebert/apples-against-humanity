// @flow

import * as config from '../../common/config'

/**
 * Serve up the pages for the game.
 */
export default class MainController {
  serverAddress: string;
  websocketAddress: string;

  constructor(ipAddress: string) {
    this.serverAddress = `${ipAddress}:${config.serverPort}`
    this.websocketAddress = `${ipAddress}:${config.websocketPort}`
  }

  game(response: ExpressResponse) {
    response.render('game', {
      serverAddress: this.serverAddress,
      websocketAddress: this.websocketAddress,
    })
  }

  player(response: ExpressResponse) {
    response.render('player', {
      websocketAddress: this.websocketAddress,
    })
  }
}
