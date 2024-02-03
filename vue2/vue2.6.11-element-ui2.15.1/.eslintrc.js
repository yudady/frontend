module.exports = {
  root: true,
  env: {
    node: true,
    browser: true, // 启用浏览器全局变量。
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-console': 0,
    'max-len': ['error', { code: 100 }], // 代码行长极限
  },
};
