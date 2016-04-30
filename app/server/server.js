const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')

const router = require('./router')

const port = 3000

const run = function() {
  const app = express()

  // set up handlebars
  app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  }))
  app.set('view engine', '.hbs')
  app.set('views', path.join(__dirname, 'views'))

  // set up router
  router.init(app)

  // start server
  app.listen(port, (err) => {
    if (err) {
      return console.log('server failed to start:', err)
    }

    console.log(`server is listening on ${port}`)
  })
}

module.exports = {
  port: port,
  run: run
}
