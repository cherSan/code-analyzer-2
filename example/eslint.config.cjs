/** @type {import("eslint").Linter.Config} */
module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    globals: {
        ...require("globals").browser,
        ...require("globals").node,
    },
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint",
        "import",
        "prettier",
    ],
    rules: {
        ...require("@eslint/js").configs.recommended.rules,
        ...require("typescript-eslint").configs.recommended.rules,

        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-explicit-any": "off",

        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",

        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        "import/order": [
            "warn",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                "newlines-between": "always",
                alphabetize: { order: "asc", caseInsensitive: true },
            },
        ],
    },
    ignorePatterns: ["node_modules/**", "dist/**", "build/**"],
};
