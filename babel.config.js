const path = require('path').resolve;
const baseDir = process.cwd();

const env = process.env.NODE_ENV;

module.exports = (api) => {
  api.cache(false);

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      ['module-resolver',
        {
          root: ['/'],
          alias: {
            Config: path(baseDir, `config/client/${env}.js`),
            Src: path(baseDir, 'src/'),
            Utils: path(baseDir, 'src/utils'),
            Components: path(baseDir, 'src/components/'),
            Pages: path(baseDir, 'src/pages/'),
            Routes: path(baseDir, 'src/routes/'),
            Reducers: path(baseDir, 'src/reducers/'),
            Actions: path(baseDir, 'src/actions/'),
            Types: path(baseDir, 'src/types/'),
            Store: path(baseDir, 'src/store/'),
            Mock: path(baseDir, '__mocks__'),
          },
        }],
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-transform-runtime',
      '@loadable/babel-plugin',
    ],
  };
};
