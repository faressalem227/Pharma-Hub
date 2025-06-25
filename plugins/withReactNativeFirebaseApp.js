const { withPlugins } = require('@expo/config-plugins');

module.exports = function withReactNativeFirebaseApp(config) {
  return withPlugins(config, []);
};
