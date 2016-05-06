import path from 'path'

const masterConfig = {
  // Gives you sourcemaps without slowing down rebundling
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app/client/master/index.js'),
  output: {
    path: path.resolve('./dist'),
    filename: 'master.js',
    publicPath: '/master'
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
  masterConfig: masterConfig
}
