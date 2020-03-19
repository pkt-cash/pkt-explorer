module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "react/prop-types": 0
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
                                         // default to 'createReactClass'
      pragma: 'React',  // Pragma to use, default to 'React'
      version: 'detect', // React version. 'detect' automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to 'detect' in the future
      flowVersion: '0.53' // Flow version
    }
  }
}
