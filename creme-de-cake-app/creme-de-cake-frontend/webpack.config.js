const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Your entry point for React
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // This will be your bundled output file
  },
  devServer: {
    static: path.resolve(__dirname, 'public'), // Serving static files from the 'public' folder
    open: true, // Open the browser automatically when the server starts
    port: 3000, // Make sure the port is set to 3000 or your preferred port
    hot: true, // Enable Hot Module Replacement (HMR) for live reloading
    historyApiFallback: true, // Ensure routes work with react-router (important for single-page apps)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // This points to your 'index.html' in the 'public' folder
      filename: 'index.html', // Ensure this is set correctly
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Transpile JS and JSX using Babel
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Handle CSS files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add JSX extension for React files
  },
};

