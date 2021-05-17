const esModules = ['react-native-iphone-x-helper'].join('|');

const setupFiles = [
  './node_modules/react-native-gesture-handler/jestSetup.js',
  './jestSetup.js',
];

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})$`],
  setupFiles,
};
