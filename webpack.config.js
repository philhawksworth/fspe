var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: "./js/render.js",
  output: {
    path: __dirname + "/dist",
    filename: "fspe.js"
  },
  resolve: {
    fallback: path.join(__dirname, "helpers")
  },
  externals: [{
      'handlebars/runtime': {
          root: 'Handlebars',
          amd: 'handlebars.runtime',
          commonjs2: 'handlebars/runtime',
          commonjs: 'handlebars/runtime'
      },
      'handlebars': {
          root: 'Handlebars',
          amd: 'Handlebars',
          commonjs: 'handlebars',
          commonjs2: 'handlebars'
      }
  }],
  module: {
    loaders: [{ test: /\.hbs$/, loader: __dirname + "/../..?runtime=handlebars/runtime" }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};




