module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use babel-jest for JavaScript/TypeScript files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-url-polyfill|react-native-inappbrowser-reborn|react-native-raw-bottom-sheet|react-native-walkthrough-tooltip|react-native-multi-flow-accordion|react-native-encrypted-storage|@react-native|@react-navigation|@react-native-async-storage/async-storage|react-native-dropdown-picker|react-native-linear-gradient|@react-native-community/datetimepicker|react-native-chart-kit|other-problematic-module|@testing-library/react-native)/)',
  ],
  setupFiles: ['./src/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};