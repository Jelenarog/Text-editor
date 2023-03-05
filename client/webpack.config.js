const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// Require the GenerateSW class of the WorkBoxPlugin 
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
//  Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // devServer: {
      
    // // The `hot` option is to use the webpack-dev-server in combination with the hot module replacement API.
    //  hot: 'only',
    // },
    plugins: [
          new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin'
    }),
    new InjectManifest({
      swSrc:'./src-sw.js',
      swDest: 'service-worker.js',
    }),

     new WebpackPwaManifest({
      name: 'Jate',
      short_name: 'Jate',
      description: 'Text editor',
      background_color: '#7eb4e2',
      theme_color: '#7eb4e2',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('./src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),

    ],


    module: {
      rules: [
       {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
       },
       {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      ],
    },
  };
};
