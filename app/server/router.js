const init = function(app) {
  app.get('/', (request, response) => {
    response.render('home', {
      name: 'World'
    })
  })
}

module.exports = {
  init: init
}
