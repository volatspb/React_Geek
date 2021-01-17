// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    plugins: [
        "react"
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
    ],
    rules: {
        'import/extensions': ['error', 'never', { packages: 'always' }],
        'max-len': ['error', { code: 120, ignoreUrls: true }],
        'no-prototype-builtins': 'off',
        'no-param-reassign': 'off',
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-restricted-globals": ["off", 'confirm'],
        "no-underscore-dangle": [2, { "allow": ['_id', '_doc'] }],
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    },
};
