module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'simple-import-sort'],
  settings: {
    react: {
      version: 'latest',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.d.ts', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'max-depth': ['error', { max: 3 }],
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'react/prop-types': 'off',
  },
};
