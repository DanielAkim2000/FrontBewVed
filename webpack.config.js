const path = require('path');

module.exports = {
  // Autres configurations Webpack...

  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/(?!@react-aria\/ssr)/
      }
    ]
  }
};
