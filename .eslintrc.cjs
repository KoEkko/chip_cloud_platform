module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		// "plugin:@typescript-eslint/recommended",  // typescript 代码检测
		"plugin:vue/vue3-essential",
		"plugin:vue/vue3-recommended",
		"prettier",
		"plugin:prettier/recommended",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "vue", "prettier"],
	rules: {
		"prettier/prettier": "error",
		indent: ["off", "tab"],
		"linebreak-style": ["off", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
