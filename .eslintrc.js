module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: ["prettier", "@typescript-eslint"],
  rules: {

    "@typescript-eslint/ban-types": [

      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        },

      }
    ]
  },

  parser: "@typescript-eslint/parser",

}