const { environment } = require('@rails/webpacker')

environment.loaders.append( 'css', {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]$[local]--[hash:base64:5]'
      }
    },
    'postcss-loader'
  ],
});

module.exports = environment
