const HomeController = require('./controllers/home')

const init = function(app) {
  var homeController = new HomeController()

  app.get('/', (request, response) => {
    homeController.main(response)
  })
}

module.exports = {
  init: init
}
