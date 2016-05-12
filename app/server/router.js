// @flow

import GameController from './controllers/game'

const init = function(app: ExpressApp) {
  var gameController = new GameController()

  app.get('/', (request, response) => {
    gameController.main(response)
  })
}

module.exports = {
  init: init
}
