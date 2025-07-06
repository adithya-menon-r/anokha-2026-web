import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import eslintPluginA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		plugins: {
			react: eslintPluginReact,
			"react-hooks": eslintPluginReactHooks,
			"@typescript-eslint": tseslint,
			"jsx-a11y": eslintPluginA11y,
		},
		rules: {
			// React
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",

			// React Hooks
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			// Accessibility
			"jsx-a11y/anchor-is-valid": "warn",

			// Typescript
			"@typescript-eslint/no-unused-vars": ["warn"],
			"@typescript-eslint/explicit-module-boundary-types": "off",

			// Console
			"no-console": ["error", { allow: ["warn", "error"] }],

			// Prettier compatibility
			...prettierConfig.rules,
		},
	},
];

export default eslintConfig;
