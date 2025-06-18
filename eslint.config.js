/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'react/display-name': 'off',
      'prettier/prettier': ['warn', require('./prettier.config')],
    },
  },
]);
