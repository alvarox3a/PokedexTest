module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/__tests__/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@d11/react-native-fast-image)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/setup.js',
  ],
};

