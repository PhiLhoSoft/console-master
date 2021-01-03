/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires -- For require statements below */

const style = require('./.eslintrc.style.js');
const semantics = require('./.eslintrc.semantics.js');

module.exports =
{
	root: true,
	plugins:
	[
		'@typescript-eslint',
	],
	parser: '@typescript-eslint/parser',
	parserOptions:
	{
		ecmaVersion: 12,
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: [ './tsconfig.eslint.json' ],
		extraFileExtensions: [ '.cjs' ],
	},
	extends:
	[
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	env:
	{
		browser: true,
		node: true,
		jest: true,
		es2021: true,
	},
	rules:
	{
		...semantics,
		...style,
	},
};
// Example of rule deactivation for one line:
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
