let webpackDeepScopePlugin = require('webpack-deep-scope-plugin').default

module.exports = {
  plugins: [
    new webpackDeepScopePlugin()
  ]
}
