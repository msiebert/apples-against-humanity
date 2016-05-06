// @flow

import MasterController from './controllers/master'

const init = function(app: ExpressApp) {
  var masterController = new MasterController()

  app.get('/', (request, response) => {
    masterController.main(response)
  })
}

module.exports = {
  init: init
}
