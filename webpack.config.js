const path = require('path');
module.exports = {
  entry: './public/components/index.js',
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  }
}
