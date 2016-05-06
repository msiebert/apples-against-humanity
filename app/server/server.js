// @flow

import express from 'express'
import expressHandlebars from 'express-handlebars'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

import router from './router'
import {masterConfig} from '../../webpack.config.js'

const port: number = 3000

const run = function() {
  const app = express()

  const masterClientCompiler = webpack(masterConfig)

  app.use('/', webpackMiddleware(masterClientCompiler))

  // set up handlebars
  app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
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
