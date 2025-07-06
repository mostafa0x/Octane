module.exports = function (api) {
  api.cache(true)

  let plugins = [
    'react-native-paper/babel',
    'react-native-reanimated/plugin', // مهم جدًا
  ]

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins,
  }
}
