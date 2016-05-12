// @flow

/**
 * Serve up the pages for the game.
 */
export default class MainController {
  game(response: ExpressResponse) {
    response.render('game', {})
  }

  player(response: ExpressResponse) {
    response.render('player', {})
  }
}
