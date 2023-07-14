module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:i18next/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'react',
		'i18next',
		'react-hooks',
		'grolaf-plugin',
	],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': [
			'error',
			process.platform === 'win32' ? 'windows' : 'unix',
		],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'@typescript-eslint/ban-ts-comment': 'off',
		'i18next/no-literal-string': [
			'error',
			{
				markupOnly: true,
				ignoreAttribute: [
					'data-testid',
					'to',
					'name',
					'target',
					'justify',
					'align',
					'direction',
					'gap',
				],
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react/display-name': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-undef': 'off',
		'grolaf-plugin/path-checker': 'error',
	},
	overrides: [
		{
			files: ['**/src/**/*.test.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
			},
		},
		{
			files: ['**/src/**/*.stories.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
	],
};
