module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb-base", "eslint-config-prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/no-unresolved": "none",
    "import/extensions": "none",
    "import/prefer-default-export": "none"
  }
};
