const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: path.resolve(__dirname, 'public')
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: "/",
    compress: true,
    port: 8000,
    historyApiFallback: true,
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development"
};