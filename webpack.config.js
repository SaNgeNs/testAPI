const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const baseDir = process.cwd();
const buildPath = path.join(baseDir, 'build');
const prodEnv = process.env.NODE_ENV === 'production';
const hasType = prodEnv ? '[contenthash]' : '[hash]';

const rules = [
  {
    test: /\.js(x?)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ]
  },
  {
    test: /\.pug$/,
    use: 'pug-loader',
  },
];
const extensions = ['.js', '.jsx'];

module.exports = [
  {
    name: "client",
    target: 'web',
    entry: {
      main: './src/client.jsx',
    },
    output: {
      path: `${buildPath}/spa`,
      publicPath: '/',
      chunkFilename: `[name].${hasType}.spa.chunk.js`,
      filename: `[name].${hasType}.spa.bundle.js`,
    },
    module: {
      rules: [
        ...rules,
      ],
    },
    resolve: {
      extensions: [
        ...extensions
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: /node_modules/,
          }
        },
      },
      moduleIds: 'hashed',
      namedModules: true,
      namedChunks: true,
      nodeEnv: prodEnv && 'production',
      mangleWasmImports: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      flagIncludedChunks: true,
      occurrenceOrder: true,
      providedExports: true,
      usedExports: true,
      concatenateModules: prodEnv,
      minimize: prodEnv,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: { // api-doc: https://terser.org/docs/api-reference#minify-options
            compress: {
              drop_console: prodEnv,
            },
            mangle: true,
            module: false,
            toplevel: true,
            keep_classnames: false,
            keep_fnames: false,
          },
        }),
      ],
    },
    plugins: [
      prodEnv ? () => {} : new BundleAnalyzerPlugin({
        defaultSizes: 'gzip',
        analyzerMode: 'server', // 'disabled'
      }),
      new CleanWebpackPlugin(),
      new CompressionPlugin(),
      new LoadablePlugin(),
      new LodashModuleReplacementPlugin(),
    ],
  },
  {
    name: 'server',
    target: 'node',
    entry: {
      main: './src/server.jsx',
    },
    externals: [webpackNodeExternals()],
    output: {
      path: buildPath,
      filename: 'server.js',
      chunkFilename: `[name].${hasType}.ssr.chunk.js`,
    },
    module: {
      rules: [
        ...rules,
      ],
    },
    resolve: {
      extensions: [
        ...extensions
      ],
    },
    plugins: [
      new NodemonPlugin({
        watch: buildPath,
        script: path.join(buildPath, 'server.js'),
      }),
    ],
  }
];
