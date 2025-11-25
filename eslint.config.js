const { defineConfig } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
   baseDirectory: __dirname,
   recommendedConfig: js.configs.recommended,
   allConfig: js.configs.all,
});

module.exports = defineConfig([
   {
      languageOptions: {
         parser: tsParser,
         ecmaVersion: 2020,
         sourceType: 'module',
         parserOptions: {},
      },
      ignores: ['eslint.config.js', 'dist/**', 'node_modules/**'],
      extends: compat.extends('plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'),
      rules: {
         'prettier/prettier': [
            'error',
            {
               endOfLine: 'auto',
            },
         ],
      },
   },
]);
