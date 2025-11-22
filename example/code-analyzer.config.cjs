/** @type {import("code-analyzer").Config} */
module.exports = {
    eslint: require("./eslint.config.cjs"),
    jest: require("./jest.config.cjs"),
    prettier: require("./prettier.config.cjs"),
};
