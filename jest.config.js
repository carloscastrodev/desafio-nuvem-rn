const esModules = ['react-native-iphone-x-helper'].join('|');

const setupFiles = [
  './node_modules/react-native-gesture-handler/jestSetup.js',
  './jestSetup.js',
];

module.exports = {
  preset: 'react-native',
  rootDir: './',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'jpeg',
    'png',
  ],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})$`],
  setupFiles,
};
