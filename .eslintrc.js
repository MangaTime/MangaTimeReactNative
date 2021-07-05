module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'react-native-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [0],
    'object-curly-newline': [0],
    'import/extensions': [0],
    'import/prefer-default-export': [0],
    'react/jsx-filename-extension': [0],
    'import/no-unresolved': [0],
  },
};
