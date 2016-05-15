// @flow

import MainController from './controllers/main'

const init = function(app: ExpressApp, ipAddress: string) {
  var mainController = new MainController(ipAddress)

  app.get('/game', (request, response) => {
    mainController.game(response)
  })

  app.get('/', (request, response) => {
    mainController.player(response)
  })
}

module.exports = {
  init: init
}
