/* eslint-disable quote-props -- Because I prefer here consistency over pure rule. */
/* eslint-disable @typescript-eslint/no-magic-numbers -- They are needed for some rules. */

// Rules from possible errors, best practices, and so on.
// Some are stylistic (eg. naming conventions) but out of the scope of formatters.
module.exports =
{
	// Note: recommended rules are generally not there

	// # Possible Errors

	// disallow template literal placeholder syntax in regular strings
	'no-template-curly-in-string': 'error',
	// disallow assignments that can lead to race conditions due to usage of `await` or `yield`
	'require-atomic-updates': 'error',

	// # Best Practices

	// enforce the use of variables within the scope they are defined
	'block-scoped-var': 'error',
	// enforce a maximum cyclomatic complexity allowed in a program
	'complexity': [ 'error', 11 ],
	// require the use of `===` and `!==`
	'eqeqeq': 'error',
	// require `for-in` loops to include an `if` statement
	'guard-for-in': 'warn',
	// disallow the use of `alert`, `confirm`, and `prompt`
	'no-alert': 'error',
	// disallow the use of `arguments.caller` or `arguments.callee`
	'no-caller': 'error',
	// disallow the use of console
	'no-console': [ 'error', { allow: [ 'info', 'warn', 'error' ] } ],
	// disallow returning value from constructor
	'no-constructor-return': 'warn',
	// disallow `else` blocks after `return` statements in `if` statements
	'no-else-return': 'warn',
	// disallow `null` comparisons without type-checking operators
	'no-eq-null': 'error',
	// disallow the use of `eval()`
	'no-eval': 'error',
	// disallow extending native types
	'no-extend-native': 'error',
	// disallow unnecessary calls to `.bind()`
	'no-extra-bind': 'error',
	// disallow declarations in the global scope
	'no-implicit-globals': 'error',
	// disallow the use of `eval()`-like methods
	'no-implied-eval': 'error',
	// disallow the use of the `__iterator__` property
	'no-iterator': 'error',
	// disallow labeled statements
	'no-labels': 'error',
	// disallow multiline strings
	'no-multi-str': 'error',
	// disallow `new` operators outside of assignments or comparisons
	'no-new': 'error',
	// disallow `new` operators with the `Function` object
	'no-new-func': 'error',
	// disallow `new` operators with the `String`, `Number`, and `Boolean` objects
	'no-new-wrappers': 'error',
	// disallow octal escape sequences in string literals
	'no-octal-escape': 'error',
	// disallow the use of the `__proto__` property
	'no-proto': 'error',
	// disallow assignment operators in `return` statements
	'no-return-assign': [ 'error', 'except-parens' ],
	// disallow `javascript:` urls
	'no-script-url': 'error',
	// disallow comparisons where both sides are exactly the same
	'no-self-compare': 'error',
	// disallow comma operators
	'no-sequences': 'error',
	// disallow unmodified loop conditions
	'no-unmodified-loop-condition': 'error',
	// disallow unnecessary calls to `.call()` and `.apply()`
	'no-useless-call': 'error',
	// disallow unnecessary concatenation of literals or template literals
	'no-useless-concat': 'error',
	// disallow `void` operators
	'no-void': [ 'error', { allowAsAStatement: true } ], // eslint-disable-line @typescript-eslint/naming-convention
	// disallow specified warning terms in comments
	'no-warning-comments': 'warn',
	// enforce the consistent use of the radix argument when using `parseInt()`
	'radix': 'error',
	// require `var` declarations be placed at the top of their containing scope
	'vars-on-top': 'error',
	// equire parentheses around immediate `function` invocations
	'wrap-iife': [ 'error', 'inside' ],
	// require or disallow "Yoda" conditions
	'yoda': 'error',

	// # Variables

	// disallow identifiers from shadowing restricted names
	'no-shadow-restricted-names': 'error',
	// disallow initializing variables to `undefined`
	'no-undef-init': 'error',

	// # Stylistic Issues

	// enforce consistent naming when capturing the current execution context
	'consistent-this': [ 'error', 'that' ],
	// require constructor names to begin with a capital letter
	'new-cap': [ 'error' ],
	// disallow bitwise operators
	'no-bitwise': 'error',
	// disallow `if` statements as the only statement in `else` blocks
	'no-lonely-if': 'error',
	// disallow nested ternary expressions
	'no-nested-ternary': 'error',
	// disallow `Object` constructors
	'no-new-object': 'error',
	// disallow ternary operators when simpler alternatives exist
	'no-unneeded-ternary': 'error',
	// enforce variables to be declared either together or separately in functions
	'one-var': [ 'error', 'never' ],

	// # ECMAScript 6

	// disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
	'prefer-object-spread': 'warn',
	// disallow arrow functions where they could be confused with comparisons
	'no-confusing-arrow': [ 'error', { allowParens: true } ],
	// disallow unnecessary computed property keys in objects and classes
	'no-useless-computed-key': 'error',
	// require `let` or `const` instead of `var`
	'no-var': 'error',
	// require or disallow method and property shorthand syntax for object literals
	'object-shorthand': 'warn',
	// require `const` declarations for variables that are never reassigned after declared
	'prefer-const': 'error',
	// require rest parameters instead of `arguments`
	'prefer-rest-params': 'warn',
	// require spread operators instead of `.apply()`
	'prefer-spread': 'warn',

	// # TypeScript plugin

	// Override recommended settings

	// Disallows non-null assertions using the ! postfix operator (TS fails sometime to see assertions, context, etc.)
	'@typescript-eslint/no-non-null-assertion': 'off',
	// Enforce template literal expressions to be of string type
	'@typescript-eslint/restrict-template-expressions': [ 'warn',
		{
			allowNumber: true,
			allowBoolean: true,
			allowAny: true,
			allowNullish: true,
		},
	],
	// Disallow unused variables
	'@typescript-eslint/no-unused-vars': [ 'warn',
		{
			varsIgnorePattern: '^_', // We can prefix a variable with _ to ignore it (probably temporarily)
			args: 'none',
			ignoreRestSiblings: true,
		},
	],

	// Override defaults from preferred

	// Requires Promise-like values to be handled appropriately
	'@typescript-eslint/no-floating-promises': 'error',
	// Disallow iterating over an array with a for-in loop
	'@typescript-eslint/no-for-in-array': 'error',
	// Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean
	'@typescript-eslint/no-inferrable-types': 'warn',
	// Enforce valid definition of new and constructor
	'@typescript-eslint/no-misused-new': 'error',
	// Avoid using promises in places not designed to handle them
	'@typescript-eslint/no-misused-promises': 'error',

	// Other settings

	// Requires using either T[] or Array<T> for arrays
	'@typescript-eslint/array-type': [ 'warn', { default: 'array-simple' } ],
	// Enforce or disallow the use of the record type (default to 'record')
	'@typescript-eslint/consistent-indexed-object-style': 'error',
	// Enforces consistent usage of type assertions
	'@typescript-eslint/consistent-type-assertions': [ 'error',
		{
			assertionStyle: 'as',
			objectLiteralTypeAssertions: 'never',
		},
	],
	// Consistent with type definition either interface or type
	'@typescript-eslint/consistent-type-definitions': [ 'error', 'type' ],
	// Require explicit return types on functions and class methods (want explict, except for void…)
	'@typescript-eslint/explicit-function-return-type': 'off',
	// Enforces using a particular method signature syntax.
	'@typescript-eslint/method-signature-style': [ 'warn', 'property' ],
	// Disallows usage of void type outside of generic or return types
	'@typescript-eslint/no-invalid-void-type': 'error',
	// Flags unnecessary equality comparisons against boolean literals
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
	// Prevents conditionals where the type is always truthy or always falsy
	'@typescript-eslint/no-unnecessary-condition': 'error',
	// Disallows unnecessary constraints on generic types
	'@typescript-eslint/no-unnecessary-type-constraint': 'warn',
	// Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated
	'@typescript-eslint/prefer-for-of': 'warn',
	// Enforce includes method over indexOf method
	'@typescript-eslint/prefer-includes': 'warn',
	// Enforce the usage of the nullish coalescing operator instead of logical chaining
	'@typescript-eslint/prefer-nullish-coalescing': 'warn',
	// Prefer using concise optional chain expressions instead of chained logical ands
	'@typescript-eslint/prefer-optional-chain': 'warn',
	// Requires that private members are marked as readonly if they're never modified outside of the constructor
	'@typescript-eslint/prefer-readonly': 'warn',
	// Requires that function parameters are typed as readonly to prevent accidental mutation of inputs
	'@typescript-eslint/prefer-readonly-parameter-types': 'off', // Better, but annoying
	// Prefer using type parameter when calling Array#reduce instead of casting
	'@typescript-eslint/prefer-reduce-type-parameter': 'warn',
	// Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings
	'@typescript-eslint/prefer-string-starts-ends-with': 'warn',

	// Override ESLint rules for TS

	// Enforces naming conventions for everything across a codebase
	'camelcase': 'off',
	'@typescript-eslint/naming-convention': [ 'error',
		{
			selector: 'default',
			format: [ 'strictCamelCase' ],
		},

		{
			selector: 'variable',
			// UPPER_CASE only for module-level consts
			format: [ 'strictCamelCase', 'UPPER_CASE' ],
		},
		{
			selector: 'parameter',
			format: [ 'strictCamelCase' ],
			leadingUnderscore: 'allow',
		},
		{
			selector: [ 'classProperty', 'classMethod' ],
			format: [ 'strictCamelCase' ],
			// For properties with getter / setter or similar.
			// For methods, use sparringly…
			leadingUnderscore: 'allow',
		},

		// {
		// 	selector: 'memberLike',
		// 	modifiers: [ 'private' ],
		// 	format: [ 'camelCase' ],
		// 	leadingUnderscore: 'require'
		// },

		{
			selector: 'typeLike',
			format: [ 'PascalCase' ],
		},
	],
	// Enforce default parameters to be last
	'default-param-last': 'off',
	'@typescript-eslint/default-param-last': 'error',
	// enforce dot notation whenever possible
	'dot-notation': 'off',
	'@typescript-eslint/dot-notation': 'warn',
	// require or disallow initialization in variable declarations
	'init-declarations': 'off',
	'@typescript-eslint/init-declarations': 'off',
	// Require or disallow an empty line between class members
	'lines-between-class-members': 'off',
	'@typescript-eslint/lines-between-class-members': 'off',
	// Disallow generic Array constructors (part of recommended)
	// 'no-array-constructor': 'off',
	// '@typescript-eslint/no-array-constructor': [],
	// Disallow duplicate class members
	'no-dupe-class-members': 'off',
	'@typescript-eslint/no-dupe-class-members': 'error',
	// Disallow duplicate imports
	'no-duplicate-imports': 'off',
	'@typescript-eslint/no-duplicate-imports': 'error',
	// Disallow empty functions
	'no-empty-function': 'off',
	'@typescript-eslint/no-empty-function': [ 'error', { allow: [ 'arrowFunctions', 'constructors' ] } ],
	// Disallow the use of eval()-like methods (part of recommended)
	// 'no-implied-eval': 'off',
	// '@typescript-eslint/no-implied-eval': [],
	// Disallow this keywords outside of classes or class-like objects
	'no-invalid-this': 'off',
	'@typescript-eslint/no-invalid-this': 'off',
	// Disallow function declarations that contain unsafe references inside loop statements
	'no-loop-func': 'off',
	'@typescript-eslint/no-loop-func': 'error',
	// Disallow literal numbers that lose precision
	'no-loss-of-precision': 'off',
	'@typescript-eslint/no-loss-of-precision': 'off',
	// Disallow magic numbers
	'no-magic-numbers': 'off',
	'@typescript-eslint/no-magic-numbers': [ 'warn',
		{
			ignore:
			[
				-1,
				0,
				1,
				2,
				3,
				10,
				// Common timing values…
				100,
				500,
				1000,
			],
		},
	],
	// Disallow variable redeclaration
	'no-redeclare': 'off',
	'@typescript-eslint/no-redeclare': 'error',
	// Disallow variable declarations from shadowing variables declared in the outer scope
	'no-shadow': 'off',
	'@typescript-eslint/no-shadow': 'off',
	// Disallow throwing literals as exceptions
	'no-throw-literal': 'off',
	'@typescript-eslint/no-throw-literal': 'error',
	// Disallow unused expressions
	'no-unused-expressions': 'off',
	'@typescript-eslint/no-unused-expressions': [ 'error',
		{
			allowShortCircuit: true,
			allowTernary: true,
			allowTaggedTemplates: true,
		},
	],
	// Disallow unused variables (part of recommended)
	// 'no-unused-vars': 'off',
	// '@typescript-eslint/no-unused-vars': [],
	// Disallow the use of variables before they are defined
	'no-use-before-define': 'off',
	'@typescript-eslint/no-use-before-define': [ 'error', 'nofunc' ],
	// Disallow unnecessary constructors
	'no-useless-constructor': 'off',
	'@typescript-eslint/no-useless-constructor': [ 'warn' ],
	// Disallow async functions which have no await expression (part of recommended)
	// 'require-await': 'off',
	// '@typescript-eslint/require-await': [],
	// Enforces consistent returning of awaited values
	'no-return-await': 'off',
	'@typescript-eslint/return-await': [ 'error' ],
};
