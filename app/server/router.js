// @flow

import ContentController from './controllers/content'
import MainController from './controllers/main'

const init = function(app: ExpressApp, ipAddress: string) {
  const mainController = new MainController(ipAddress)
  const contentController = new ContentController()

  app.get('/game', (request, response) => {
    mainController.game(response)
  })

  app.get('/', (request, response) => {
    mainController.player(response)
  })

  app.get('/content', (request, response) => {
    contentController.listContent(response)
  })

  app.get('/content/:file', (request, response) => {
    const file = request.params.file
    contentController.getContentFile(response, file)
  })
}

module.exports = {
  init: init
}
