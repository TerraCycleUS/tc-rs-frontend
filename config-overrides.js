const CompressionPlugin = require("compression-webpack-plugin");
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    filename: "[path][query]",
    algorithm: "gzip",
    deleteOriginalAssets: false,
  })
  return config
}
