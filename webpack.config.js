import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import atImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import FlowStatusWebpackPlugin from 'flow-status-webpack-plugin'

function genConfig(name: string): Object {
  return {
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      path.join(__dirname, `app/client/${name}/index.js`),
      `webpack-hot-middleware/client?reload=false&path=/${name}/hot`,
      'webpack/hot/dev-server',
    ],
    output: {
      path: path.resolve('./dist'),
      filename: `${name}.js`,
      publicPath: `/${name}`,
    },
    resolve: {
      root: path.resolve(__dirname),
      alias: {
        client: 'app/client',
        common: 'app/common',
        game: 'app/client/game',
        player: 'app/client/player',
        server: 'app/server',
        styles: 'app/styles',
      },
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
        {
          test: /\.jsx$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'app'),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
            "style",
            "css!sass!postcss"
          ),
        },
      ],
      postcss: [
        atImport({
          path: ['node_modules', './app',],
        }),
        autoprefixer({ add: false, browsers: [] }),
      ],
    },
    plugins: [
      new ExtractTextPlugin(`${name}.css`),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new FlowStatusWebpackPlugin({
        restartFlow: false,
      })
    ],
  }
}

module.exports = {
  gameConfig: genConfig('game'),
  playerConfig: genConfig('player'),
}
