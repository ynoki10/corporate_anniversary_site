module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    'string-quotes': 'single',
    'selector-id-pattern': null, // idでkebab-case以外も許容
    'selector-class-pattern': null, // classでkebab-case以外も許容
    'keyframes-name-pattern': null, // keyframesでkebab-case以外も許容
    'custom-property-pattern': null, // CSS変数でkebab-case以外も許容
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply'],
      },
    ],
  },
};
