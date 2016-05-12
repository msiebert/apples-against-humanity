import path from 'path'

const gameConfig = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app/client/game/index.js'),
  output: {
    path: path.resolve('./dist'),
    filename: 'game.js',
    publicPath: '/game'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.jsx$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      }
    ]
  }
}

const playerConfig = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app/client/player/index.js'),
  output: {
    path: path.resolve('./dist'),
    filename: 'player.js',
    publicPath: '/player'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.jsx$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      }
    ]
  }
}

module.exports = {
  gameConfig,
  playerConfig
}
