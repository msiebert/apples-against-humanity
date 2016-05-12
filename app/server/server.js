// @flow

import express from 'express'
import expressHandlebars from 'express-handlebars'
import http from 'http'
import path from 'path'
import socketIO from 'socket.io'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

import config from '../common/config'
import SocketCommands from '../common/socketcommands'
import router from './router'
import {gameConfig} from '../../webpack.config.js'

const port: number = 3000

const run = function() {
  const app = express()
  const socketServer = http.createServer(app)
  const io = socketIO(socketServer)

  const gameClientCompiler = webpack(gameConfig)

  app.use('/', webpackMiddleware(gameClientCompiler))

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

  configureSockets(io)
  socketServer.listen(port + 1)
}

const configureSockets = function(io) {
  io.sockets.on('connection', (socket) => {
    socket.on(SocketCommands.joinRoom, (room) => {
      socket.join(room)
    })
  })
}

module.exports = {
  port: port,
  run: run
}
