const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNativePlugin = require('eslint-plugin-react-native');

module.exports = [
  {
    ignores: ['node_modules/**', '.expo/**', 'android/**', 'ios/**'],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-native': reactNativePlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // ─────────────────────────────────────────────
      // REACT HOOKS
      // ─────────────────────────────────────────────
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ─────────────────────────────────────────────
      // IMPORTS
      // ─────────────────────────────────────────────
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off',

      // Optional:
      // Enforce named exports
      // Disable if your team prefers default exports
      'import/no-default-export': 'off',

      // ─────────────────────────────────────────────
      // TYPESCRIPT
      // ─────────────────────────────────────────────
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          ignoreRestArgs: true,
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
        },
      ],

      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-shadow': 'warn',

      // Enable later if you switch to type-aware ESLint
      // '@typescript-eslint/no-floating-promises': 'error',

      // ─────────────────────────────────────────────
      // NAMING CONVENTIONS
      // ─────────────────────────────────────────────
      '@typescript-eslint/naming-convention': [
        'warn',

        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },

        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },

        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // ─────────────────────────────────────────────
      // CODE QUALITY
      // ─────────────────────────────────────────────
      'prefer-const': 'error',

      eqeqeq: ['error', 'always'],

      curly: ['error', 'all'],

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      'no-duplicate-imports': 'error',

      'no-unused-expressions': 'warn',

      'no-useless-return': 'warn',

      // ─────────────────────────────────────────────
      // REACT
      // ─────────────────────────────────────────────
      'react/jsx-no-useless-fragment': 'warn',

      'react/self-closing-comp': 'warn',

      // React 17+ / Expo
      'react/react-in-jsx-scope': 'off',

      // ─────────────────────────────────────────────
      // REACT NATIVE
      // ─────────────────────────────────────────────

      // Useful but can be noisy.
      // Consider turning on later.
      'react-native/no-inline-styles': 'off',

      'react-native/no-unused-styles': 'warn',

      'react-native/split-platform-components': 'warn',
    },
  },
];
