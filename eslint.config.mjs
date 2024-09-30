import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'ts/no-unused-expressions': 'off',
    'no-restricted-globals': 'off',
    'node/prefer-global/process': 'off',
    'node/handle-callback-err': 'off',
    'unused-imports/no-unused-vars': 'off',
    'vue/block-order': [
      'error',
      { order: ['style', 'template', 'script:not([setup])', 'script[setup]'] },
    ],
  },
  stylistic: {
    indent: 2,
  },
  regexp: false,
  unicorn: false,
})
