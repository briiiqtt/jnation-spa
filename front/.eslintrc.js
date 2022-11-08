module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'plugin:react/recommended',
  overrides: [],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['react'],
  rules: { 'react/prop-types': 0 },
};
