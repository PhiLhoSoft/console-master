/* eslint-disable quote-props -- Because I prefer here consistency over pure rule. */
/* eslint-disable @typescript-eslint/no-magic-numbers -- They are needed for some rules. */

// Style rules that can be applied by a formatter
// Note: recommended rules are generally not there
module.exports =
{
	// # Best Practices

	// enforce consistent brace style for all control statements
	'curly': [ 'error', 'all' ],
	// enforce consistent newlines before and after dots
	'dot-location': [ 'error', 'property' ],
	// disallow unnecessary nested blocks
	'no-lone-blocks': 'warn',
	// disallow multiple spaces
	'no-multi-spaces': 'error',

	// # Stylistic Issues

	// Common choice…
	// 'array-bracket-spacing': [ 'error', 'never' ],
	// My choice…
	'array-bracket-spacing': [ 'warn', 'always' ],
	// disallow or enforce spaces inside of blocks after opening block and before closing block
	'block-spacing': [ 'error', 'always' ],
	// enforce consistent comma style
	'comma-style': [ 'error', 'last' ],
	// enforce consistent spacing inside computed property brackets
	'computed-property-spacing': [ 'error', 'never' ],
	// require or disallow newline at the end of files
	'eol-last': 'error',
	// enforce consistent spacing between keys and values in object literal properties
	'key-spacing': [ 'error', { beforeColon: false, afterColon: true } ],
	// enforce consistent linebreak style
	'linebreak-style': [ 'error', 'unix' ],
	// enforce a maximum line length
	'max-len': [ 'warn', 160, 4, { ignoreComments: false, ignoreUrls: true } ],
	// enforce or disallow parentheses when invoking a constructor with no arguments
	'new-parens': 'error',
	// require a newline after each call in a method chain
	'newline-per-chained-call': [ 'error', { ignoreChainWithDepth: 4 } ],
	// disallow floating decimals (.2 or 2.)
	'no-floating-decimal': 'warn',
	// disallow multiple empty lines
	'no-multiple-empty-lines': [ 'error', { max: 1 } ],
	// disallow trailing whitespace at the end of lines
	'no-trailing-spaces': 'error',
	// disallow whitespace before properties
	'no-whitespace-before-property': 'error',
	// enforce consistent spacing inside braces
	'object-curly-spacing': [ 'error', 'always' ],
	// require or disallow newlines around variable declarations
	'one-var-declaration-per-line': 'error',
	// enforce consistent linebreak style for operators
	'operator-linebreak': [ 'error', 'after' ],
	// require or disallow padding within blocks
	'padded-blocks': [ 'error', 'never' ],
	// require quotes around object literal property names
	'quote-props': [ 'error', 'as-needed' ],
	// enforce consistent spacing before and after semicolons
	'semi-spacing': [ 'error', { before: false, after: true } ],
	// enforce consistent spacing before blocks
	'space-before-blocks': 'error',
	// enforce consistent spacing inside parentheses
	'space-in-parens': [ 'error', 'never' ],
	// enforce consistent spacing before or after unary operators
	'space-unary-ops': [ 'error', { words: true, nonwords: false } ],
	// enforce consistent spacing after the `//` or `/*` in a comment
	'spaced-comment': [ 'warn', 'always',
		{
			exceptions: [ '-', '=', '#' ], // For lines of separators
			line:
			{
				markers: [ '/' ],
			},
			block:
			{
				markers: [ '*' ],
				balanced: true,
			},
		},
	],
	// require or disallow Unicode byte order mark (BOM)
	'unicode-bom': [ 'error', 'never' ],

	// # ECMAScript 6

	// require braces around arrow function bodies
	'arrow-body-style': [ 'warn', 'as-needed' ],
	// require parentheses around arrow function arguments
	'arrow-parens': 'warn',
	// enforce consistent spacing before and after the arrow in arrow functions
	'arrow-spacing': 'warn',
	// enforce consistent spacing around `*` operators in generator functions
	'generator-star-spacing': [ 'error', 'after' ],
	// require or disallow spacing around the `*` in `yield*` expressions
	'yield-star-spacing': [ 'error', 'after' ],
	// enforce spacing between rest and spread operators and their expressions
	'rest-spread-spacing': 'error',
	// require or disallow spacing around embedded expressions of template strings
	'template-curly-spacing': 'error',

	// Other settings

	// Require a specific member delimiter style for interfaces and type literals
	'@typescript-eslint/member-delimiter-style': [ 'warn',
		{
			multiline:
			{
				delimiter: 'semi',
				requireLast: true,
			},
			singleline:
			{
				delimiter: 'semi',
				requireLast: false,
			},
		},
	],

	// Override ESLint rules for TS

	// Enforce consistent brace style for blocks
	'brace-style': 'off',
	// Common choice…
	// '@typescript-eslint/brace-style': [ 'error', '1tbs', { 'allowSingleLine': true } ],
	// My choice…
	'@typescript-eslint/brace-style': [ 'error', 'allman', { allowSingleLine: true } ],
	// Require or disallow trailing comma
	'comma-dangle': 'off',
	'@typescript-eslint/comma-dangle': [ 'warn', 'always-multiline' ],
	// Enforces consistent spacing before and after commas
	'comma-spacing': 'off',
	'@typescript-eslint/comma-spacing': [ 'warn', { before: false, after: true } ],
	// Require or disallow spacing between function identifiers and their invocations
	'func-call-spacing': 'off',
	'@typescript-eslint/func-call-spacing': [ 'warn', 'never' ],
	// Disallow unnecessary parentheses
	'no-extra-parens': 'off',
	'@typescript-eslint/no-extra-parens': 'warn',
	// Disallow unnecessary semicolons (part of recommended)
	// 'no-extra-semi': 'off',
	// '@typescript-eslint/no-extra-semi': [],
	// Enforce the consistent use of either backticks, double, or single quotes
	'quotes': 'off',
	'@typescript-eslint/quotes': [ 'warn', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
	// Require or disallow semicolons instead of ASI
	'semi': 'off',
	'@typescript-eslint/semi': [ 'warn', 'always' ],
	// Enforces consistent spacing before function parenthesis
	'space-before-function-paren': 'off',
	'@typescript-eslint/space-before-function-paren': [ 'error', { anonymous: 'always', named: 'never', asyncArrow: 'always' } ],
	// This rule is aimed at ensuring there are spaces around infix operators.
	'space-infix-ops': 'off',
	'@typescript-eslint/space-infix-ops': [ 'error', { 'int32Hint': false } ],
};
