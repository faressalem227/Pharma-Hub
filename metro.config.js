const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const exclusionList = require('metro-config/src/defaults/exclusionList');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

config.resolver.blacklistRE = exclusionList([
  /node_modules\/engine\.io-client\/build\/esm\/transports\/polling-xhr\.node\.js/,
  /node_modules\/engine\.io-client\/build\/esm\/transports\/websocket\.node\.js/,
]);

module.exports = withNativeWind(config, { input: './global.css' });
