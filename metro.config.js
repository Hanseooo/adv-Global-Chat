const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default Metro config
const config = getDefaultConfig(__dirname);

// Ensure Metro correctly resolves Firebase modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@firebase/auth': path.resolve(__dirname, 'node_modules/@firebase/auth'),
};

module.exports = config;
