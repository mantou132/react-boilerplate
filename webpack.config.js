const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * @type {import('webpack-pwa-manifest').ManifestOptions}
 */
const webManifestConfig = {
  filename: 'manifest.webmanifest',
  fingerprints: false,
  name: 'My Progressive Web App',
  short_name: 'MyPWA',
  description: 'My awesome Progressive Web App!',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  icons: [
    {
      src: 'src/logo.svg',
      sizes: [96, 128, 192, 256, 384, 512],
      purpose: 'any maskable',
    },
  ],
};

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/main',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              getCustomTransformers: () => ({
                before: isDevelopment ? [ReactRefreshTypeScript()] : [],
              }),
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|webp)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({})],
  },
  output: {
    publicPath: '/',
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new WebpackManifestPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: webManifestConfig.name,
      favicon: webManifestConfig.icons[0].src,
      meta: {
        description: webManifestConfig.description,
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: './' }],
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [/\.map$/, /hot-update\.js$/],
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks',
    }),
    new WebpackPwaManifest(webManifestConfig),
    new GenerateSW(),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true,
    contentBase: './build',
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
