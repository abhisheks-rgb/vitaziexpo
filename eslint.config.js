const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const reactHooks = require('eslint-plugin-react-hooks');

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
      'react-hooks': reactHooks,
    },

    rules: {
      // ─────────────────────────────────────────────
      // REACT HOOKS (keep as-is)
      // ─────────────────────────────────────────────
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ─────────────────────────────────────────────
      // IMPORT ORDER (already good, keep)
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
      'import/no-unresolved': 'off', // RN + TS handles this better

      // ─────────────────────────────────────────────
      // TYPESCRIPT BEST PRACTICES
      // ─────────────────────────────────────────────
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',

      // ─────────────────────────────────────────────
      // CODE QUALITY (AI detection helpers)
      // ─────────────────────────────────────────────
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      complexity: ['warn', 10], // detect over-engineered logic
      'max-depth': ['warn', 4],
      'max-lines': ['warn', 300],
      'max-lines-per-function': ['warn', 80],

      // ─────────────────────────────────────────────
      // NAMING (helps catch AI-style generic names)
      // ─────────────────────────────────────────────
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // ─────────────────────────────────────────────
      // CUSTOM "AI-SMELL" DETECTION
      // ─────────────────────────────────────────────
      'no-restricted-syntax': [
        'warn',
        {
          selector: "Identifier[name='data']",
          message: "Avoid generic name 'data' — use a meaningful name.",
        },
        {
          selector: "Identifier[name='result']",
          message: "Avoid generic name 'result' — be specific.",
        },
        {
          selector: "Identifier[name='item']",
          message: "Avoid generic name 'item' — clarify intent.",
        },
        {
          selector: "Identifier[name='value']",
          message: "Avoid generic name 'value'.",
        },
        {
          selector: "Identifier[name='temp']",
          message: "Avoid temporary variable names like 'temp'.",
        },
      ],

      // ─────────────────────────────────────────────
      // GENERAL CLEANLINESS
      // ─────────────────────────────────────────────
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'warn',
      'no-useless-return': 'warn',
    },
  },
];
