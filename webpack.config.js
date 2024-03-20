const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // Ihre Webpack-Konfiguration hier...

  plugins: [
    new BundleAnalyzerPlugin()
  ]
};