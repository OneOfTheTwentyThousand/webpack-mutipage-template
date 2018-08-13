const path = require('path');
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '..'),
  resolve: {
    extensions: ['.js', '.scss', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'js/[name].[chunkhash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        include: [resolve('src/script/page/**/*.js')]
      },
      {
        test: /\.scss$/,
        include: [resolve('src/style/')],
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              // useRelativePath: true,
              name: '[path][hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude:['src/page/components'],
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
              root: resolve('dist')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};