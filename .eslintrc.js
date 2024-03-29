module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "jest"],
  rules: {
    semi: ["error", "always"],
    "prefer-promise-reject-errors": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-uses-vars": "error",
    "max-classes-per-file": "off",
    "react/no-unstable-nested-components": "off",
    "no-console": "error",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
