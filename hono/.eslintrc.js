module.exports = {
  root: true,
  extends: ['@hono/eslint-config', 'plugin:drizzle/all', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['drizzle'],
  rules: {
    'drizzle/enforce-delete-with-where': [
      'error',
      {
        drizzleObjectName: ['db', 'get'],
      },
    ],
    'drizzle/enforce-update-with-where': [
      'error',
      {
        drizzleObjectName: ['db', 'get'],
      },
    ],
  },
}
