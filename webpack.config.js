const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const USEHASH = '[hash]'; //Use [hash] in case of HMR is enabled and [contenthash] otherwise

module.exports = {
  mode: 'production',
  entry: { index: './src/js/index.js' },
  output: {
    filename: `js/[name].${USEHASH}.bundle.js`,
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].build.[ext]',
              outputPath: 'images/',
              publicPath: '../images'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import'
            ]
            //cacheDirectory: true //To cache transpiled code
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { exclude: ['template','favicon.ico'], verbose: true }), //To cleanup dis folder every time with unwanted assets
    new HtmlWebpackPlugin({
      inject: 'head', //All the JS resources will be placed at head element
      filename: 'wwwroot/index.html',
      template: path.join(__dirname, 'src/web/index.html')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer' //To add defer property in script tags
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.HashedModuleIdsPlugin(), //To prevent vendor hash id to change everytime
    new MiniCssExtractPlugin({
      filename: `css/[name].${USEHASH}.build.css`
    }),
    new webpack.HotModuleReplacementPlugin(), //This doesn't work with [contenthash] or [chunkhash] and uncomment it if HMR is needed
    new WebpackMd5Hash()
  ],
  devtool: 'source-map', //'inline-source-map'(for development mode), //To show the console error with exact file name
  devServer: {
    contentBase: path.join(__dirname, 'dist'), //Webpack dev server will lookup for this dir
    index: 'wwwroot/index.html',
    hot: true
  },
  optimization: {
    runtimeChunk: 'single', //To extract the manifest and runtime
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          mangle: false,
          keep_fnames: true,
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
          output: {
            beautify: false,
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    sideEffects: false,
    minimize: false
  }
};
