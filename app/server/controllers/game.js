// @flow

/**
 * Handle requests for the home page (which is where to access the main screen
 * for the game).
 */
export default class GameController {
  main(response: ExpressResponse) {
    response.render('game', {})
  }
}
