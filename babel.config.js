
module.exports = {
  presets: [
    'module:@react-native/babel-preset',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
  plugins: [
    // Ensure these plugins have matching "loose" settings
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
    ["@babel/plugin-transform-class-properties", { "loose": true }],
  ],
  overrides: [
    {
      test: /node_modules\/(@testing-library\/react-native)/,
      sourceType: 'unambiguous', // Handle mixed ESModule/CommonJS
    },
  ],
};


// module.exports = {
//   presets: [
//     'module:@react-native/babel-preset'],
//   env: {
//     test: {
//       presets: ['@babel/preset-env', '@babel/preset-react'],
//     },
//   },
// };
