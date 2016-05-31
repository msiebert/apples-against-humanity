// @flow

import express from 'express'
import expressHandlebars from 'express-handlebars'
import http from 'http'
import os from 'os'
import path from 'path'
import socketIO from 'socket.io'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

import Colors from '../common/colors'
import * as config from '../common/config'
import SocketCommands from '../common/socketcommands'
import * as socketData from '../common/socketcommands'

import router from './router'

import {gameConfig, playerConfig} from '../../webpack.config.js'

const run = function() {
  const app = express()
  const socketServer = http.createServer(app)
  const io = socketIO(socketServer)

  const gameClientCompiler = webpack(gameConfig)
  const playerClientCompiler = webpack(playerConfig)

  app.use('/', webpackMiddleware(gameClientCompiler))
  app.use('/', webpackMiddleware(playerClientCompiler))

  // set up handlebars
  app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  }))
  app.set('view engine', '.hbs')
  app.set('views', path.join(__dirname, 'views'))

  // set up router
  router.init(app, getLocalIp())

  // start server
  app.listen(config.serverPort, (err) => {
    if (err) {
      return console.log('server failed to start:', err)
    }

    console.log(`server is listening on ${config.serverPort}`)
  })

  configureSockets(io)
  socketServer.listen(config.websocketPort)
}

const configureSockets = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on(SocketCommands.joinRoom, (room) => {
      socket.join(room)

      socket.emit(SocketCommands.setPlayerColor, getRandomColor())

      socket.on(
        SocketCommands.loginPlayer,
        (data: socketData.LoginPlayerData): void => {
          io.to(data.room).emit(SocketCommands.loginPlayer, data)
        }
      )

      socket.on(
        SocketCommands.givePlayerCard,
        (data: socketData.GivePlayerCardData): void => {
          io.to(data.room).emit(SocketCommands.givePlayerCard, data)
        }
      )
    })
  })
}

const getRandomColor = () => {
  const keys = Object.keys(Colors)
  keys.splice(keys.indexOf('none'), 1)
  const index = Math.floor(Math.random() * 1000) % (keys.length)
  return Colors[keys[index]]
}

const getLocalIp: () => string = () => {
  let address = ''
  const ifaces = os.networkInterfaces()

  for (const dev in ifaces) {
    const iface = ifaces[dev].filter((details) => {
        return details.family === 'IPv4' && details.internal === false
    });

    if (iface.length > 0) address = iface[0].address
  }

  return address
}

module.exports = {
  run
}
